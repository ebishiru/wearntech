import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AllItemsContext } from "../contexts/AllItemsContext"
import ItemCard from "./ItemCard";
import { BsLink45Deg } from "react-icons/bs";

const CompanyPage = () => {
    const { allItems } = useContext(AllItemsContext);
    const { _id: companyId } = useParams();
    const [ company, setCompany ] = useState(null);

    useEffect(() => {
        const fetchCompany = async () => {
            const response = await fetch(`/company/${companyId}`);
            const { data } = await response.json();
            setCompany(data);
        };
        fetchCompany();
    }, [companyId]);

    let itemsFromCompany = [];
    
    if (company && allItems) {
        itemsFromCompany = (allItems.filter(item => item.companyId === Number(companyId)))
    }

    return (
        <>
        {
            company? (
                <>
                    {/* Company Title section */}
                    <section> 
                        <h1><a href={company.url} target="_blank">{company.name}<BsLink45Deg  size={40}/></a></h1>
                        <h2>Products made in {company.country}</h2>
                    </section>

                    {/* Products by Company section */}
                    <section className="item-grid-co center">
                        {
                            allItems? (
                                itemsFromCompany.length > 0? (
                                    itemsFromCompany.map((item) => (
                                        <ItemCard key={item._id} item={item}/>
                                    ))
                                ) : (
                                    <p>No products found for this company.</p>
                                )
                            ) : (
                                <p>Loading products from {company.name}...</p>
                            )
                        }
                    </section>
                </>
            ) : (
                <p>Loading Company Info...</p>
            )
        }
        </>
    )
}
export default CompanyPage;