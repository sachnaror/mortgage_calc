require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error("MongoDB connection error:", err.message);
        process.exit(1); // Exit if MongoDB connection fails
    });

// Middleware
app.use(cors({ origin: "http://localhost:4200" })); // Adjust based on your frontend URL
app.use(express.json()); // Parse JSON bodies

// Mortgage Schema
const MortgageSchema = new mongoose.Schema({
    loanAmount: { type: Number, required: false },
    interestRate: { type: Number, required: false },
    loanTerm: { type: Number, required: false },
    creditScore: { type: String, required: false },
    propertyType: { type: String, required: false },
    propertyTaxRate: { type: Number, required: false },
    insuranceCost: { type: Number, required: false },
    monthlyPayment: { type: Number, required: false },
    totalPayment: { type: Number, required: false },
});

const Mortgage = mongoose.model("Mortgage", MortgageSchema);

// Save Mortgage Data Endpoint
app.post("/calculate", async (req, res) => {
    try {
        const mortgageData = req.body;
        const savedMortgage = new Mortgage(mortgageData);
        await savedMortgage.save();
        res.status(200).send({
            message: "Mortgage data saved successfully!",
            data: savedMortgage,
        });
    } catch (error) {
        console.error("Error saving mortgage data:", error.message);
        res.status(500).send({ error: "Failed to save mortgage data." });
    }
});

// Fetch All Mortgages Endpoint
app.get("/mortgages", async (req, res) => {
    try {
        const mortgages = await Mortgage.find();
        res.status(200).send(mortgages);
    } catch (error) {
        console.error("Error fetching mortgages:", error.message);
        res.status(500).send({ error: "Failed to fetch mortgages." });
    }
});

// Default 404 handler
app.use((req, res) => {
    res.status(404).send({ error: "Endpoint not found." });
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
