import { useContext } from "react"
import { AllCompaniesContext } from "../contexts/AllCompaniesContext"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
const AllCompanies = () =>{
    const {companies} = useContext(AllCompaniesContext)

    if(!companies){
        return <p>Loading companies...</p>
    }
    // sort in alphabetical order
    const companiesinAlphaOrder = companies.sort((a,b)=> a.name.localeCompare(b.name))
    const groupedByLetter = companiesinAlphaOrder.reduce((accumulator, company) => {
        const companyNameFirstLetter = company.name[0].toUpperCase();
        const firstLetters = /^[A-Z]/.test(companyNameFirstLetter) ? companyNameFirstLetter : "#";
        if (!accumulator[firstLetters]) {
            accumulator[firstLetters] = [];
        }
        accumulator[firstLetters].push(company);
        return accumulator;
    }, {})
    return (<>
        <h1 style={{margin: "3rem 0"}}>All Companies</h1>
        <CompaniesGrid>
            {Object.keys(groupedByLetter).map((letter) => (
            <div key={letter}>
                <Letter>{letter}</Letter>
                <CompanyLists>
                {groupedByLetter[letter].map((company) => (
                    <li><Company key={company._id} to={`/company/${company._id}`}>{company.name}</Company></li>
                ))}
                </CompanyLists>
            </div>
            ))}
        </CompaniesGrid>
    </>)

}
const CompaniesGrid = styled.div`
    display:grid;
    grid-template-columns: repeat(4, 17rem);
    gap: 5px;
    justify-content: center;
    margin-bottom: 3rem;
    padding-bottom: 1.5rem;
`
const Letter = styled.h2`
    text-align:left;
    padding-left: 1rem;
`
const CompanyLists = styled.ul`
    padding: 1rem;
    list-style: inside;
    line-height:1.4rem;
`
const Company = styled(NavLink)`
    padding:0;
    &:hover{
        text-decoration: underline;
        font-weight:bold;
    }
`
export default AllCompanies