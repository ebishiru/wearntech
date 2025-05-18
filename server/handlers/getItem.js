const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const getItem = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    const itemId = req.params.itemId; 
    if (!itemId) {
        return res.status(400).json({ status: 400, message: "Item ID must be a valid number." });
    }
    try {
        await client.connect();
        const db = client.db("e-commerce");
        
        const result = await db.collection("items").findOne({ _id: Number(itemId) });
        if (result) {
            res.status(200).json({ status: 200, data: result });
        } else {
            res.status(404).json({ status: 404, message: "Item not found." });
        }
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();
    }
};

module.exports = getItem;
