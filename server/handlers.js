const getItems = require("./handlers/getItems");
const getItem = require("./handlers/getItem")
const getCompanies = require("./handlers/getCompanies")
const getCompany = require("./handlers/getCompany")
const getCart = require("./handlers/getCart")
const getReceipt = require("./handlers/getReceipt");
const addItemToCart = require("./handlers/addItemToCart")
const deleteAllItemsFromCart = require("./handlers/deleteAllItemsFromCart")
const deleteItemFromCart = require("./handlers/deleteItemFromCart")
const confirmPurchase = require("./handlers/confirmPurchase")
const updateItems = require ("./handlers/updateItems")
const signUp = require("./handlers/signUp")
const logIn = require("./handlers/logIn")


module.exports = {
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
};