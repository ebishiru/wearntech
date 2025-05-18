import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { CartContext } from "../contexts/CartContext"
import { TrashIcon } from "../components/Icons";
import { AllItemsContext } from "../contexts/AllItemsContext";
const ViewCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  console.log(cartItems)
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { cart, setCart, addItemToCart, replaceCart } = useContext(CartContext);
  const {setRefetch} = useContext(AllItemsContext)
  const { _id: cartId } = cart; // Access the cart._id here  

  // Fetching cart items and their details (e.g., price)
  useEffect(() => {
    fetchCartItems();
  }, [cart]);

  // Fetch cart items from the backend
  const fetchCartItems = () => {
    if (!cartId) {
      console.error("Cart ID is missing.");
      return;
    }
  
    const url = `/cart/${cartId}/`;  // Updated URL without itemId
  
    fetch(url)
      .then((response) => {

        if (!response.ok) {
          throw new Error(`Error fetching cart items: ${response.statusText}`);
        }
        return response.json();
      })
      .then((parsed) => {
        const items = parsed.data.items;
        if (!items || items.length === 0) {
          console.error("No items found in the cart data:", parsed);
          return [];  // Return empty array if no items exist
        }
        return fetchItemsDetails(items);  // Continue with fetching item details
      })
      .then((itemsWithDetails) => {
        setCartItems(itemsWithDetails);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error in fetchCartItems:", error);
      });
  };

  // Fetching item details such as price, numInStock
  const fetchItemsDetails = (items) => {
  
    if (!Array.isArray(items)) {
      // If items is not an array, return an empty array or handle it accordingly
      console.error("Items is not an array:", items);
      return [];
    }
  
    const itemDetailsPromises = items.map((item) => {
      return fetch(`/item/${item._id}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.log(`Error fetching details for item ID: ${item._id}`);
            return null;
          }
        })
        .then((parsed) => {
          if (parsed) {
            // Converting price from string to number for calculation purposes
            const priceWithoutSymbol = parsed.data.price.replace("$", "");
            item.details = {
              ...parsed.data,
              price: parseFloat(priceWithoutSymbol),
            };
            return item;
          } else {
            return item;
          }
        })
        .catch((error) => {
          console.error(error);
          return item;
        });
    });
  
    return Promise.all(itemDetailsPromises)
      .then((itemDetails) => itemDetails.filter((item) => item !== null))
      .catch((error) => {
        console.error(error);
        return items;
      });
  };

  // Decrease quantity of an item
  const decreaseQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity--;
      setCartItems(updatedCartItems);
    }
  };

  // Increase quantity of an item, the limit is the number of items in stock
  const increaseQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    if (
      updatedCartItems[index].quantity <
      updatedCartItems[index].details.numInStock
    ) {
      updatedCartItems[index].quantity++;
      console.log(updatedCartItems[index])
      addItemToCart(updatedCartItems[index], 1)
      setCartItems(updatedCartItems);
    }
  };

  // Calculate the total price of the items in the cart
  const calculateOrderTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.details.price * item.quantity;
    });
    return total;
  };

  // Handle checkout
  const handleCheckout = () => {
    fetch(`/cart/${cartId}`, {
      method: "POST",
      body: JSON.stringify({items: cartItems}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Error during checkout");
        }
      })
      .then((data) => {
        if(data.status !== 200){
          console.error(data.message)
        }
        navigate(`/order/${data.data._id}/receipt`, {
          state: { purchaseInfo: cartItems },
        });
        })
      .catch((error) => {
        console.error(error);
      });
      const options= {
        method: "PATCH",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      }
      fetch(`/cart/${cartId}`, options)
      .then(response => {
        if(!response.ok){
          throw new Error("Inventory has not been updated")
        }
        return response.json()})
      .then(data => {
        if(data.status === 202){
          setCart({})
          replaceCart({_id: cartId, items: []})
          handleEmptyCart()
          setRefetch((fetch)=> fetch + 1)
        }
      })
  };

 
  // Handle deletion of a single item from the cart
  const handleDeleteItem = (itemId) => {
    const options = {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }
    fetch(`/cart/${cartId}/${itemId}`, options )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error deleting item from cart", response.status);
        }
        return response.json()
      })
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error deleting item from cart:", error);
      });
  };
    

  // Handle deletion of all items from the cart
  const handleEmptyCart = () => {
    fetch(`/cart/${cartId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setCartItems([]); 
          replaceCart({_id: cartId, items: []}) // Empty the cart state
        } else {
          throw new Error("Error deleting all items from cart");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      {isLoading ? (
        <Loading />  
      ) : cartItems.length > 0 ? (
        <>
          <div className="fullViewCartPage">
            {cartItems.map((item, index) => (
              <div className="itemInCart" key={index}>
                <img src={item.details.imageSrc} alt={item.details.name} />
                <div className="detailsOfCartItem">
                  <h3 style={{fontSize: "1.3rem"}}>{item.details.name}</h3>
                  <p>{item.details.category}</p>
                  <p>Price: ${item.details.price.toFixed(2)}</p>
                  <div>
                    <button onClick={() => decreaseQuantity(index)}>-</button>
                    <span> {item.quantity} </span>
                    <button onClick={() => increaseQuantity(index)}>+</button>
                    {item.quantity >= item.details.numInStock && (
                      <span>Maximum amount in stock!</span>
                    )}
                    <div>
                      <button className="viewCartPageButtons" onClick={() => handleDeleteItem(item._id)}>
                        <TrashIcon /> Delete
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="fullViewCartPage orderTotal">
            <h2 style={{textAlign: "left"}}>ORDER TOTAL: ${calculateOrderTotal().toFixed(2)}</h2>
            <div style={{marginTop: "2rem"}}>
              <button className="viewCartPageButtons" onClick={handleCheckout}>Proceed to Checkout</button>
              <button className="viewCartPageButtons" onClick={handleEmptyCart}>Empty Cart</button>
            </div>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default ViewCartPage;