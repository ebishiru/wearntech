import { useContext, useEffect, useState } from "react";
import { AllItemsContext } from "../contexts/AllItemsContext"
import { AllCompaniesContext } from "../contexts/AllCompaniesContext";
import ItemCard from "./ItemCard";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

const ViewItemsPage = () => {
  const {allItems}  = useContext(AllItemsContext);
  const {companies} = useContext(AllCompaniesContext)
  const location = useLocation()
  const [filter, setFilter] = useState(()=> (item) => true)
  const [filterName, setFilterName] = useState("All Products")
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Number of items per page


  ///// FILTERS START HERE
  //extracts information from the query
  const filters = new URLSearchParams(location.search)
  const category = filters.get("category")
  const bodyLocation = filters.get("body")
  const company = filters.get("company")
  const underPrice = filters.get("under")
  // Getting all company names for the filter buttons
  if(!companies){
      return <p>Loading companies...</p>
  }
  // sort in alphabetical order
  const companiesinAlphaOrder = companies.sort((a,b)=> a.name.localeCompare(b.name))
  

  //sets the filters for the array.filter() for the display of items
  useEffect(()=> {
      setFilter(()=>(item)=> {
        // checks if the filter is applied
        const categoryFilter = !category || item.category.toLowerCase() === category
        const bodyFilter = !bodyLocation || item.body_location.toLowerCase() === bodyLocation
        const companyFilter = !company || item.companyId === Number(company)
        const underPriceFilter = !underPrice || parseFloat(item.price.replace("$","")) < Number(underPrice)
        return categoryFilter && bodyFilter && companyFilter && underPriceFilter
      })
      //find and set the filter name for the h2
      if (!company || !category || !bodyLocation || !underPrice){
        setFilterName("All products")
        setCurrentPage(1)
      }
      if (company){
        const companyName = companies.find((individualCo) => individualCo._id === Number(company))
        setFilterName(companyName.name)
        setCurrentPage(1)
      }
      if(category){
        setFilterName(category)
        setCurrentPage(1)
      }
      if(bodyLocation){
        setFilterName(bodyLocation)
        setCurrentPage(1)
      }
      if(underPrice){
        setFilterName(`under $${underPrice}`)
        setCurrentPage(1)
      }
    },[category, bodyLocation, company, underPrice])
  
    if(!allItems){
      return <p>Loading items...</p>
    }
    //finds the unique categories
    const uniqueItemCategories = [... new Set(allItems.map(item => item.category))]
    //finds unique body location
    const uniqueItemBody = [... new Set(allItems.map(item => item.body_location))]

    //sort in alphabetical order
    const categoriesinAlphaOrder = uniqueItemCategories.sort((a,b)=> a.localeCompare(b))
    const bodyInAlphaOrder = uniqueItemBody.sort((a,b) => a.localeCompare(b))
  ///// FILTERS END HERE




///// PAGINATION STARTS HERE
// Paginate items: Determine the index of the first and last items for the current page
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = allItems.filter(filter).slice(indexOfFirstItem, indexOfLastItem);
  
// Calculate total pages
const totalPages = Math.ceil(allItems.filter(filter).length / itemsPerPage);

  // Handle page changes
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  ///// PAGINATION ENDS HERE

  return (
    <div>
      <h1 style={{marginTop: "3rem", marginBottom: "1rem"}}>Products</h1>
      {filterName && <FilterName>{ filterName }</FilterName>}
      <div className="section">
        <div className="filterSection">
          <p className="filterTitle">Filter by:</p>
          <h2>Company</h2>
          <div className="companyFilter">
          {companiesinAlphaOrder.map((company) => {
            return <Filter key={company._id} to={`/items?company=${company._id}`}><p>{company.name}</p></Filter>
          })}
          </div>
          <h2>Category</h2>
          {allItems === null ? <></> : <div className="categoryAndLocationFilter">
            {categoriesinAlphaOrder.map((category) => {
              return <Filter key={category} to={`/items?category=${category.toLowerCase()}`}>{category}</Filter>
            })}
            </div>
            }
          <h2>Placement</h2>
          {allItems === null ? <></> : <div className="categoryAndLocationFilter">
            {bodyInAlphaOrder.map((body) => {
              return <Filter key={body} to={`/items?body=${body.toLowerCase()}`}>{body}</Filter>
            })}
            </div>}
          <h2>Price</h2>
          {allItems === null ? <></> : <div className="categoryAndLocationFilter">
              <Filter to={`/items?under=20`}>Under $20</Filter>
              <Filter to={`/items?under=50`}>Under $50</Filter>
              <Filter to={`/items?under=100`}>Under $100</Filter>
            </div>}
        </div>
        <div className="itemsAndPagination">
          <div className="item-grid">
            {(allItems.length > 0) ? (
                currentItems.filter(filter).map((item) => (
                  <ItemCard key={item._id} item={item}/>
                  ))
              ) : (
                <p>No items available</p>
              )
            }
          </div>
          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Prev
            </button>
            <span> Page {currentPage} of {totalPages} </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const Filter = styled(NavLink)`
  padding:0;
  display:flex;
  flex-direction:column;
  &:hover{
      text-decoration:underline;
  }
`
const FilterName = styled.h2`
  text-transform:capitalize;
`
export default ViewItemsPage;