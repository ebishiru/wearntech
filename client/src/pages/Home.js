import { AllItemsContext } from "../contexts/AllItemsContext"
import { useContext, useRef } from "react"
import ItemCard from "./ItemCard"
import laptop from "../imgs/laptop.jpg"

const Home = () => {
    // Getting all items from context
    const {allItems} = useContext(AllItemsContext)
    const itemsRef = useRef()
    const selectedItems = []

    // Getting a set number of random items from allItems context
    if(allItems !==null){
        // First filtering out the out of stock items
        const noOutOfStock = allItems.filter((item) => item.numInStock > 0)
        // Then randomizing the items to show on the featured page
        const shuffled = noOutOfStock.sort(() => 0.5-Math.random())
        const selected = shuffled.slice(0, 10)
        // And pushing each of them in the empty selectedItems array to
        // map it in the return
        selected.forEach(item => {
            selectedItems.push(item)
        })
    }

    // Arrow buttons click/scroll functions
    const arrowRightClick = () => {
        itemsRef.current.style.scrollBehavior = "smooth";
        itemsRef.current.scrollLeft += 375;
    }
    const arrowLeftClick = () => {
        itemsRef.current.style.scrollBehavior = "smooth";
        itemsRef.current.scrollLeft -= 375;
    }
    
    return <>
    <img src={laptop} className="homepagePhoto"></img>
    <div className="banner">
        <h1>Wear n' Tech</h1>
        <div className="homepage"></div>
            <h2>Your one stop shop for wearable tech!</h2>
                <p className="featuredItems">Featured items</p>
                <div className="wrapContainer">
                    <p id="arrowLeft" onClick={arrowLeftClick} className="arrows"><i className="arrow left"></i></p>
                        <div className="individualFeaturedItems" ref={itemsRef} >
                            {allItems === null ? <p>Loading...</p> : <>
                                {selectedItems.map((selectedItem) => {
                                    return <div className="grid" key={selectedItem._id}><ItemCard item={selectedItem} /></div>
                                })}
                            </>}
                        </div>
                    <p id="arrowRight" onClick={arrowRightClick} className="arrows"><i className="arrow right"></i></p>
                </div>
        </div>
    </>
}

export default Home