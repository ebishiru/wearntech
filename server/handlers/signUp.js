const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require("uuid");

const signUp = async (req, res) => {
    const { email, name, address } = req.body;
    const client = new MongoClient(MONGO_URI);
    
    if (!email || !name || !address) {
        return res.status(400).json({
            status: 400,
            message: "Email, name, and address are required."
        });
    }
    try {
        await client.connect();
        const db = client.db("e-commerce");
        const existingUser = await db.collection("users").findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                status: 409,
                message: "User with this email already exists."
            });
        }
        const cartId = uuidv4();
        const newCart = { _id: cartId, items: [] };
        await db.collection("cart").insertOne(newCart);
        const newUser = {
            _id: uuidv4(),
            email,
            name,
            address,
            cartId
        };
        const result = await db.collection("users").insertOne(newUser);
        if (!result.acknowledged) {
            return res.status(500).json({
                status: 500,
                message: "Failed to create user."
            });
        }
        res.status(201).json({
            status: 201,
            message: "User created successfully.",
            data: newUser
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

module.exports = signUp
