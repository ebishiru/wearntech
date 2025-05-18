const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const getReceipt = async (req, res) => {
    const { orderId } = req.params; 
    const client = new MongoClient(MONGO_URI);
    if (!orderId) {
        return res.status(400).json({
            status: 400,
            message: "Order ID is required.",
        });
    }
    try {
        await client.connect();
        const db = client.db("e-commerce");
        const order = await db.collection("orders").findOne({ _id: orderId });
        if (!order) {
            return res.status(404).json({
                status: 404,
                message: "Order not found.",
            });
        }
        res.status(200).json({
            status: 200,
            message: "Receipt retrieved successfully.",
            data: order,
        });
    } catch (error) {
        console.log(error);
        res.status(502).json({
            status: 502,
            message: error.message,
        });
    } finally {
        await client.close();
    }
};

module.exports = getReceipt;
