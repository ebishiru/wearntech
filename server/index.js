const express = require("express");
const morgan = require("morgan");

const {
    getItems,
    getItem,
    getCompanies,
    getCompany,
    getCart,
    getReceipt,
    addItemToCart,
    deleteAllItemsFromCart,
    deleteItemFromCart,
    confirmPurchase,
    updateItems,
    signUp,
    logIn,
} = require("./handlers");

const PORT = 4000;

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

app.get("/items", getItems)
app.get("/item/:itemId", getItem);
app.get("/companies", getCompanies)
app.get("/company/:companyId", getCompany)
app.get("/cart/:cartId", getCart)
app.get("/order/:orderId/receipt", getReceipt);

app.post("/cart/:cartId/:itemId", addItemToCart)
app.delete("/cart/:cartId", deleteAllItemsFromCart)
app.delete("/cart/:cartId/:itemId", deleteItemFromCart)
app.post("/cart/:cartId", confirmPurchase)
app.patch("/cart/:cartId", updateItems)
app.post("/signUp", signUp)
app.post("/logIn", logIn)


app.get("*", (req, res) => {
    res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for!",
    });
})


// endpoints go here

app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
