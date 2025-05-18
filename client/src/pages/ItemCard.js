import React, { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';
const ItemCard = ({ item }) => {
  const {addItemToCart} = useContext(CartContext)
  const navigate = useNavigate()
  const {currentUser} = useContext(UserContext)
  // State for showing a message after adding an item to the cart
  const [added, setAdded] = useState(false);
  

  // Handle add to cart action
  const handleAddToCart = (item, event) => {
    event.stopPropagation();
    if(!currentUser){
      navigate("/logIn")
    }
    addItemToCart(item, 1); // adds item in the cart collection in the database
    setAdded(true);  // Show confirmation message
    setTimeout(() => setAdded(false), 2000);  // Hide confirmation after 2 seconds
  };

  return (
    <div className="item-card">
        <div className="item-card-header">
          {/* Item Image */}
          <NavLink to={`/item/${item._id}`}>
            <img src={item.imageSrc} alt={item.name} className="item-image" />
          </NavLink>
        </div>

        <NavLink to={`/item/${item._id}`}>
          <div className="item-card-body">
            {/* Item Name */}
              <h3 className="item-name">{item.name}</h3>
    
            {/* Item Price */}
            <p className="item-price">{item.price}</p>
          </div>
        </NavLink>

        {/* Add to Cart Button */}
        <button className="add-to-cart-btn" onClick={(event) => handleAddToCart(item, event)} disabled={item.numInStock === 0}>
          {item.numInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
        {/* Confirmation Message */}
        {added && <p className="added-message">Added to Cart!</p>}
    </div>
  );
};

export default ItemCard;