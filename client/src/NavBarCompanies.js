import { useContext} from "react"
import {AllCompaniesContext} from "./contexts/AllCompaniesContext"
import { NavLink } from "react-router-dom"
import styled from "styled-components"

const NavBarCompanies = ({handleCoNav}) => {
    const {companies} = useContext(AllCompaniesContext)
    if(!companies){
        return <Loading>Loading companies...</Loading>
    }
    // sort in alphabetical order
    const companiesinAlphaOrder = companies.sort((a,b)=> a.name.localeCompare(b.name))

    return(
    <div className="dropdownMenu" style={{position: "fixed", width: "100%", backgroundColor: "var(--color-yellow)", textAlign: "center", paddingTop: "1rem"}}>
        <AllCompanies to="/companies" onClick={handleCoNav}>All companies</AllCompanies>
        <NavDrop>
        {companiesinAlphaOrder.map(company => {
            return <EachCompany key={company._id} to={`/company/${company._id}`} onClick={handleCoNav}>{company.name}</EachCompany>
            })
        }
        </NavDrop>
    </div>
    )
}
const NavDrop = styled.div`
    z-index: 1;
    box-sizing: border-box;
    padding: 1em 0 1em 1em;
    display:grid;
    grid-template-rows: repeat(15, 1.5rem);
    grid-template-columns: repeat(5, 15rem);
    gap: 5px;
    grid-auto-flow:column;
    width:100%;
    background-color: var(--color-yellow);
    justify-content: center;
    font-weight: bold;
`
const EachCompany = styled(NavLink)`
    height:fit-content;
    width:fit-content;
    padding: 0;
    text-align:left;
    &:hover{
        text-decoration:underline;
    }
`
const AllCompanies = styled(EachCompany)`
    font-weight: bolder;
    font-size: 1.5rem;
`
const Loading = styled.h2`
    background-color: var(--color-yellow);
`
export default NavBarCompanies