const {MongoClient} = require("mongodb");
require("dotenv").config();
const {MONGO_URI} = process.env
const {v4: uuidv4} = require("uuid")

const confirmPurchase = async(req, res) =>{
    const {cartId} = req.params
    const {items} = req.body
    const client = new MongoClient(MONGO_URI)

    const newOrder = {
        _id: uuidv4(),
        cartId : cartId,
        items: items
    }
    try {
        await client.connect()
        const db = client.db("e-commerce")
        const confirmedPurchase = await db.collection("orders").insertOne(newOrder)
        if(!confirmedPurchase.acknowledged){
            return res.status(500).json({
                status:500,
                message:"Failed to confirm the purchase"
            })
        }
        res.status(200).json({
            status: 200,
            message: "Purchase confirmed",
            data: newOrder
        })
    }
    catch(error){
        console.log(error)
        res.status(502).json({
            status:502,
            message: error.message
        })
    }
    finally{
        await client.close()
    }
}

module.exports = confirmPurchase