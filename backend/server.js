require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

// Middleware
app.use(cors({ origin: "http://localhost:4200" })); // Allow frontend origin
app.use(express.json()); // Parse JSON request bodies

// Mortgage Schema
const MortgageSchema = new mongoose.Schema({
    loanAmount: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    loanTerm: { type: Number, required: true },
    creditScore: { type: String, required: true },
    propertyType: { type: String, required: true },
    propertyTaxRate: { type: Number, required: true },
    insuranceCost: { type: Number, required: true },
    adjustedInterestRate: { type: Number },
    totalMonthlyPayment: { type: Number },
});

const Mortgage = mongoose.model("Mortgage", MortgageSchema);

// POST /calculate: Save mortgage data
app.post("/calculate", async (req, res) => {
    try {
        const data = req.body;

        // Derive adjustedInterestRate and totalMonthlyPayment if not provided
        data.adjustedInterestRate = data.interestRate + 0.5; // Example adjustment logic
        data.totalMonthlyPayment =
            (data.loanAmount * (data.adjustedInterestRate / 100)) / 12; // Simplified calculation

        // Save data to MongoDB
        const mortgage = new Mortgage(data);
        await mortgage.save();

        res.status(200).send({ message: "Mortgage data saved successfully!", data: mortgage });
    } catch (error) {
        console.error("Error saving mortgage data:", error.message);
        res.status(500).send({ error: "Internal server error." });
    }
});

// GET /mortgages: Retrieve all mortgage records with pagination
app.get("/mortgages", async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        // Fetch records with pagination
        const mortgages = await Mortgage.find()
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.status(200).send({ mortgages, page: Number(page), limit: Number(limit) });
    } catch (error) {
        console.error("Error retrieving mortgage data:", error.message);
        res.status(500).send({ error: "Failed to fetch mortgage data." });
    }
});

// Default 404 Route
app.use((req, res) => {
    res.status(404).send({
        error: "Endpoint not found",
        message: "Please use one of the available endpoints.",
        availableEndpoints: [
            { method: "POST", path: "/calculate", description: "Save mortgage data" },
            { method: "GET", path: "/mortgages", description: "Get mortgage records with pagination" },
        ],
    });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
