const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

// updates items
const updateItems = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    const cartId  = req.params.cartId;    

    try {
        await client.connect();
        const db = client.db("e-commerce");

        // find cart object from database
        const cart = await db.collection("cart").findOne({ _id: cartId });

        if (!cart) {
            return res.status(404).json({ status: 404, message: "Cart not found."});
        }

        const itemsInCart = cart.items; // array of objects with keys _id & quantity
        let currentNumInStock = 0;
        // Check if inventory is sufficient for all items
        const stockCheckPromises = itemsInCart.map(async (itemInCart) => {
            const itemId = itemInCart._id;
            const quantityOfItem = itemInCart.quantity;

            // find item data from database
            const foundItem = await db.collection("items").findOne({ _id: Number(itemId) });

            if (!foundItem) {
                return { success: false, status: 404, message: `Item ID ${itemId} could not be found.`}
            }

            // stock of found item

            currentNumInStock = foundItem.numInStock;

            // verify that inventory is available
            if (currentNumInStock === 0 || currentNumInStock - quantityOfItem < 0) {
                return { success: false, status: 400, message: `Not enough inventory available for Item ID ${itemId}.`}
            }
            console.log(currentNumInStock)
            return { success: true, status: 200, message: "Sufficient inventory for cart items,"};

        });
        
        const stockCheckResults = await Promise.all(stockCheckPromises);

        //Confirm that inventory for all is sufficient
        const failedStockChecks = stockCheckResults.filter(result => !result.success);

        if (failedStockChecks.length > 0) {
            return res.status(400).json({ status: 400, message: "Inventory insufficient", error: failedStockChecks})
        }

        // Update item data for all items
        const updatePromises = itemsInCart.map(async (itemInCart) => {
            const itemId = itemInCart._id;
            const quantityOfItem = itemInCart.quantity;
            const query = { _id: Number(itemId) };
            const newValues = {
                $set: {
                    numInStock: currentNumInStock - quantityOfItem
                }
            };

            const result = await db.collection("items").updateOne(query, newValues);

            if (result.modifiedCount === 0) {
                return { success: false, status: 400, message: `Could not update inventory for Item ID ${itemId}.`}
            }

            return { success: true, status: 202, message: `Inventory updated for Item ID ${itemId}.`};
        })
            
        // Confirm all updates are completed successfully
        const updateResults = await Promise.all(updatePromises);
        const failedUpdateResults = updateResults.filter(result => !result.success);

        if (failedUpdateResults.length > 0) {
            return res.status(400).json({ status: 400, message: "Error encountered.", error: failedUpdateResults})
        }

        res.status(202).json({ status: 202, message: "Inventory successfully updated."})

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    } finally {
        client.close();
    }
}

module.exports = updateItems;
