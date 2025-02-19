// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const { Client, LocalAuth } = require("whatsapp-web.js");
const dotenv = require("dotenv");
const User = require("./models/user"); // User Model

dotenv.config();
const app = express();
app.use(express.json());

// Initialize WhatsApp Client
const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on("ready", () => {
    console.log("WhatsApp Client is Ready!");
});

client.initialize();

// Function to send WhatsApp messages
const sendWhatsAppMessage = async (phoneNumber, message) => {
    try {
        await client.sendMessage(`${phoneNumber}@c.us`, message);
        console.log("Message sent to:", phoneNumber);
    } catch (error) {
        console.error("Error sending message:", error);
    }
};

// API to send Registration Message
app.post("/send-registration-message", async (req, res) => {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const message = `Dear ${user.name}, Thanks for choosing Future Life Care. Your USER ID: ${user.userId}, Password: ${user.password}, Transaction Password: ${user.transactionPassword}. Do not share with anyone. Team FLC.`;
    await sendWhatsAppMessage(user.phone, message);
    res.json({ success: true, message: "Registration message sent!" });
});

// API to send Activation Message
app.post("/send-activation-message", async (req, res) => {
    const { userId, productPackage } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const message = `Dear ${user.name}, Congratulations & Welcome to Future Life Care Family. Your ID ${user.userId} Activated Successfully. Your Product Package (${productPackage}) will be delivered to you soon. Team FLC.`;
    await sendWhatsAppMessage(user.phone, message);
    res.json({ success: true, message: "Activation message sent!" });
});

// API to send Payout Withdrawal Request Message
app.post("/send-payout-withdrawal-message", async (req, res) => {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const message = `Dear ${user.name}, you have successfully raised your payout withdrawal request. Your payout will be credited within 48-72 hours after verification. Team FLC.`;
    await sendWhatsAppMessage(user.phone, message);
    res.json({ success: true, message: "Payout withdrawal message sent!" });
});

// API to send Payout Credited Message
app.post("/send-payout-credited-message", async (req, res) => {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const message = `Dear ${user.name}, congratulations! Your payout has been successfully transferred to your bank account. Wait for bank update. Team FLC.`;
    await sendWhatsAppMessage(user.phone, message);
    res.json({ success: true, message: "Payout credited message sent!" });
});

// API to send E-Voucher Request Message
app.post("/send-evoucher-request-message", async (req, res) => {
    const { userId, quantity } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const message = `Dear ${user.name}, your request for ${quantity} e-vouchers has been successfully submitted. They will be transferred after verification. Team FLC.`;
    await sendWhatsAppMessage(user.phone, message);
    res.json({ success: true, message: "E-Voucher request message sent!" });
});

// API to send E-Voucher Delivered Message
app.post("/send-evoucher-delivered-message", async (req, res) => {
    const { userId, quantity } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const message = `Dear ${user.name}, your request for ${quantity} e-vouchers has been approved and they have been transferred to your FLC account. Team FLC.`;
    await sendWhatsAppMessage(user.phone, message);
    res.json({ success: true, message: "E-Voucher delivered message sent!" });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Start Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
