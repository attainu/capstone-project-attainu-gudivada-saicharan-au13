import express from "express";

import { readdirSync } from 'fs'
import cors from "cors";
import mongoose from 'mongoose';

import { Console } from "console";
import { allHotels } from "../client/src/actions/hotel";
const morgan = require ("morgan")
require("dotenv").config();


const stripe = require("stripe")("sk_test_51Ia2LNSDOwdRoCaIQDDz272fS7dc6eg8ggQJ4fKxcMPGh2nt5eiqtMIsBQ4hbbnZRS9IkGRyI9eSSZ9j7tmbTRaU00IChbIg1B");



const app = express();


mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB Connection Error: ",err));
// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Add your stripe secret key to the .require('stripe') statement!");
});

app.post("/checkout", async (req,res) => {
    console.log("Request:", req.body);

    let error;
    let status;
    try {
        const {setHotel, token } = req.body;

        const customer = await
        stripe.customer.create({
            email: token.email,
            source: token.id
        });

        const idempotency_key = uuid();
        const charge = await stripe.charges.create(
            {
                amount: hotels.price * 100,
                currency: "INR",
                customer: customer.id,
                receipt_email: token.email,
                description: `purchased the INR {setHotel.name}`,
                shipping: {
                    name: token.card.name,
                    address: {
                        line1: token.card.address_line1,
                        line2: token.card.address_line2,
                        city: token.card.address_city,
                        country: token.card.address_country,
                        postal_code: token.card.address_zip
                    }
                }
            },
            {
                idempotency_key
            }
        );
        console.log("charge:", { charge });
        status = "success";
    
    } catch (error) {
        console.error("Error:", error);
        status = "failure";
    }

    res.json({ error, status });
});

// route middleware
readdirSync("./routes").map((r) => 
    app.use("/api",require(`./routes/${r}`))
);


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server is running on port ${port}`));