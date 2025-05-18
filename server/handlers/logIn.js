const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const logIn = async (req, res) => {
    const { email } = req.body;
    const client = new MongoClient(MONGO_URI);
    if (!email) {
        return res.status(400).json({
            status: 400,
            message: "Email is required."
        });
    }
    try {
        await client.connect();
        const db = client.db("e-commerce");
        const user = await db.collection("users").findOne({email});
        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "Invalid email."
            });
        }

        const cart = await db.collection("cart").findOne({ _id: user.cartId });
        
        res.status(200).json({
            status: 200,
            message: "Login successful.",
            data: user
        });
    } catch (error) {
        res.status(502).json({
            status: 502,
            message: error.message
        });
    } finally {
        await client.close();
    }
};


module.exports = logIn
