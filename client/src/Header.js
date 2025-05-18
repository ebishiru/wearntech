import { HomeIcon, CartIcon} from "./components/Icons"
import { NavLink} from "react-router-dom"
import { useContext, useState } from "react"
import styled from "styled-components"
import NavBarCompanies from "./NavBarCompanies"
import NavBarItems from "./NavBarItems"
import { CartContext } from "./contexts/CartContext"
import { UserContext } from "./contexts/UserContext"

const Header = () => {
    const [itemNavOpen, setItemNavOpen] = useState(false)
    const [coNavOpen, setCoNavOpen] = useState(false)
    const {cart, totalItems} = useContext(CartContext)
    const { currentUser, logOut} = useContext(UserContext);
    
    //opens the item nav and closes the companies nav
    const handleItemNav = () =>{
        setItemNavOpen(!itemNavOpen)
        setCoNavOpen(false);
    }
    // opens the companies dropdown nav and also close the item 
    const handleCoNav = () =>{
        setCoNavOpen(!coNavOpen)
        setItemNavOpen(false)
    }
    // closes the Nav dropdown when anything else is clicked 
    const closeNav = () =>{
        setCoNavOpen(false);
        setItemNavOpen(false)
    }

    return <><StyledNavigationBar>
        <p style={{position: "absolute", fontFamily: "Josefin Sans", textShadow: "1.5px 1.5px var(--color-yellow)", marginLeft: "10px", cursor: "default"}}>Wear n' Tech</p>
        <div className="pagesNavigation">
            <NavLink to="/" onClick={closeNav}><HomeIcon/> Home</NavLink>
            <ItemNavButton type="button" className="active" onClick={handleItemNav}>Products</ItemNavButton>
            <ItemNavButton type="button" className="active" onClick={handleCoNav}>Brands</ItemNavButton>
            <NavLink to="/about" onClick={closeNav}>About</NavLink>
            <NavLink to={currentUser?`/cart/${cart._id}`: "/logIn"} onClick={closeNav} style={{ position: "relative" }}><CartIcon />
            {totalItems > 0 && <CartCount>{totalItems}</CartCount>}</NavLink>
        </div>
        <User>
            {!currentUser ? 
            <><NavLink to="/logIn" onClick={closeNav}>Log In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink></>
            : <HelloUserAlignment><p>Hello, {currentUser.name}</p>
            <NavLink to="/" onClick={logOut}>Log Out</NavLink></HelloUserAlignment>}
        </User>
    </StyledNavigationBar>
    {itemNavOpen && <NavBarItems handleItemNav={handleItemNav}/>}
    {coNavOpen && <NavBarCompanies handleCoNav={handleCoNav}/>}
    </>
}


// Placeholder for now, will change it later when we get to CSS stuff
const StyledNavigationBar = styled.nav`
    background-color: var(--color-red);
    font-weight: bolder;
    font-size: 1.5rem;
    color: var(--color-white);
    display: flex;
    top: 0;
    width: 100%;
    height:25px;
    padding: 1.5rem;
    position: sticky;
    margin: 0;
    padding: 1rem 0;
    z-index: 11;
    a{
        color: var(--color-white);
    }
    .pagesNavigation {
        display: inline-block;
        align-items: center;
        text-align: center;
        margin: 0 auto;
        position: relative;
    }
`
const ItemNavButton = styled.button`
    padding: 0 2.5rem;
    border: none;
    background-color: transparent;
    color: var(--color-white);
    font-family: Josefin Sans;
    font-size:1.5rem;
    font-weight:bolder;
    height:28px;
    &:hover{
        cursor: pointer;
    }
`
const User = styled.div`
    position:absolute;
    right:0;
    font-size: 1.25rem;
    margin-right: 10px;
    a{
        padding:0 0.5rem;
    }
`
const HelloUserAlignment = styled.div`
    display:flex;
    flex-direction:row;
    gap: 5px;
`
const CartCount = styled.span`
    position: absolute;
    background-color: var(--color-yellow);
    color: black;
    font-size: 0.75rem;
    font-weight: bold;
    border-radius: 50%;
    padding: 4px 7px;
`;

export default Header