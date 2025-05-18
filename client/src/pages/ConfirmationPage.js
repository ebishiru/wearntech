import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Loading from "../components/Loading";

const Confirmation = () => {
  const location = useLocation();
  const { purchaseInfo } = location.state || {}; // Make sure purchaseInfo exists


  return (
    <div>
      {true ? (
        <>
          <h1>Thank you for your purchase!</h1>
          <h2>Receipt Details</h2>
          <div style={{width: "fit-content", margin: "5rem auto", boxShadow: "1px 1px 5px var(--color-gray)", padding: "1rem"}}>
            {Array.isArray(purchaseInfo) && purchaseInfo.length > 0 ? (
              purchaseInfo.map((item, index) => (
                <div style={{display: "flex"}} key={index}>
                  <img
                    src={item.details.imageSrc}
                    alt={item.details.name}
                    width="100"
                    height="100"
                  />
                  <div className="detailsOfCartItem">
                  <h3>{item.details.name}</h3>
                  <p>Price: ${item.details.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No items found in your purchase.</p>
            )}
          </div>
        </>
      ) : (
        // Show loading message
        <div>
          <h2>Thank you for shopping with us!</h2>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Confirmation;