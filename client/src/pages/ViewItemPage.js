import { useParams, Link,useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext"
import { UserContext } from "../contexts/UserContext";
import styled from "styled-components";

const ViewItemPage = () => {
  const { _id: itemId } = useParams();
  const [product, setProduct] = useState(null);
  const [company, setCompany] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);  //confirm that item was added to cart
  const { cart, replaceCart} = useContext(CartContext);
  const cartId = cart._id;  // Make sure cart is not null and then destructure _id
  const {currentUser} = useContext (UserContext)
  const navigate = useNavigate()

  //Fetches
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        //Fetch item's data from database
        const itemResponse = await fetch(`/item/${itemId}`);
        if (!itemResponse.ok) throw new Error("Could not fetch item");
        const { data: itemData } = await itemResponse.json();
        setProduct(itemData);

        //Using item's data, fetch company data from database
        const companyResponse = await fetch(`/company/${itemData.companyId}`);
        if (!companyResponse.ok) throw new Error ("Could not fetch company");
        const { data: companyData } = await companyResponse.json();
        setCompany(companyData);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchItemData();
  },[itemId]);

  const handleAddToCart = async (ev) => {
    ev.preventDefault();
    if(!currentUser){
      navigate("/logIn")
    }
    if (!cartId) {
        console.error("Cart ID is not available!");
        return;  // Handle this case, maybe show a message to the user.
    }
    setStatus("processing");

    const orderData = {
        _id: itemId,
        quantity: quantity,
    };
      const body = JSON.stringify( orderData );
      const options = {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body
      };
      
  try {
    const response = await fetch(`/cart/${cartId}/${itemId}`, options);

    // Check if the response is valid and contains expected data
    if (!response.ok) {
      setStatus("");
      throw new Error("Failed to add item to cart");
    }

    const addToCartData = await response.json();

    // Check if `addToCartData` and `addToCartData.status` are valid before accessing them
    if (addToCartData && addToCartData.status === 201) {
      replaceCart(addToCartData.data)
      setAddedToCart(true);
      setTimeout(()=> setAddedToCart(false), 2000)
    } else {
      setStatus(""); // Reset status if something went wrong
      console.error(addToCartData ? addToCartData.message : "Unknown error");
    }
  } catch (error) {
    setStatus(""); // Reset status if error occurs
    console.error("Error adding item to cart:", error.message);
  }
};

  if (!product || !company) {
    return <p>Loading Information...</p>;
  }

  return (
    <>
      <StyledItemSection>
      {/* General Item Data */}
        <img src={product.imageSrc} alt={product.name} />
        <div className="fullItemDescription">
          <div className="productInfo">
            <p className="productName">{product.name}</p>
            <p className="productCompany"><Link style={{color: "var(--color-red)", fontWeight: "bold", padding: "0"}} to={`/company/${company._id}`}>{company.name}</Link></p>
            <p className="productCategory" style={{fontWeight: "bold"}}>{product.category}</p>
            <p className="productCategory">Used on: {product.body_location}</p>
            <p className="productPrice">{product.price}</p>
          </div>

          {/* Stock and Quantity */}
          <div className="viewItemButtons">
          <section>
          {
            product.numInStock === 0 ? (
              <button className="cartButton" disabled>OUT OF STOCK</button>
            ) : (
              <>
                {/* Subtract quantity button */}
                <button className="plusAndMinusButtons" onClick={() => setQuantity(Math.max(quantity - 1, 1))} disabled={quantity === 1}> - </button>
                {/* Displays desired amount*/}
                <span> {quantity} </span>
                {/* Increase quantity button */}
                <button className="plusAndMinusButtons" onClick={() => setQuantity(Math.min(quantity + 1, product.numInStock))} disabled={quantity === product.numInStock}> + </button>
            
                {/* When max quantity is met, user is informed that they cannot purchase more*/}
                { 
                  quantity === product.numInStock ? (
                    <p className="quantityMessage">Maximum quantity available. No more stock for sale...</p>
                  ) : (
                    <p className="quantityMessage">Please purchase as many as you'd like!</p>
                  )
                }
                <button className="cartButton" onClick={handleAddToCart} disabled={status === "processing"}>Add to Cart</button>
                {/* Confirmation message that item was added to cart*/}
                {addedToCart && <p>{quantity}x {product.name}: Successfully added to Cart!</p>}
              </>
            )}
          </section>
        </div>
      </div>
      </StyledItemSection>
    </>
  )
};

export default ViewItemPage;
//kev

const StyledItemSection = styled.section`
  display: flex;
  margin: 8rem;
  position: relative;
  img{
    min-width: 300px;
    transition: ease-in-out 0.3s;
    margin: auto 1rem;
    padding: 1.5rem;
    box-shadow: 1px 1px 5px var(--color-gray);
    &:hover{
      transform: scale(1.1);
    }
  }
  .productInfo{
    padding: 0 2.5rem;
  }
  .productName{
    font-weight: bold;
    font-size: 2.5rem;
    padding-bottom: 1rem;
  }
  .productCompany{
    font-size: 2.25rem;
    padding-bottom: 1rem;
    &:hover{
      text-decoration: underline;
    }
  }
  .productCategory{
    font-size: 1.25rem;
    padding: 0.2rem 0;
  }
  .productPrice{
    font-weight: bold;
    font-size: 2rem;
    padding: 1rem 0;
  }
  .viewItemButtons{
    padding: 0 2.5rem;
    button{
      background-color: var(--color-yellow);
      color: var(--color-white);
      font-family: Raleway;
      font-weight: bold;
      font-size: 15px;
      border-radius: 5px;
      border: solid 2px var(--color-black);
      cursor: pointer;
      &:active{
        transform: scale(0.95);
      }
      &:disabled{
        opacity: 50%;
        cursor: not-allowed;
        transform: scale(1)
      }
    }
    .cartButton{
      padding: 10px;
    }

  }
  .fullItemDescription{
    display: flex;
    flex-direction: column;
  }
  .quantityMessage{
    margin: 10px 0;
  }
`