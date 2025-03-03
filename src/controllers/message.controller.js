const { getUserById } = require("../queries/userQuery");
const { sendWhatsAppMessage } = require("../services/message.service");

const sendRegistrationMessage = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await getUserById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const message = `Dear ${user.name}, Thanks for choosing Future Life Care. Your USER ID: ${user.userId}, Password: ${user.password}, Transaction Password: ${user.transactionPassword}. Do not share with anyone. Team FLC.`;
        await sendWhatsAppMessage(user.phone, message);
        res.json({ success: true, message: "Registration message sent!" });
    } catch (error) {
        console.error("Error sending registration message:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const sendActivationMessage = async (req, res) => {
    try {
        const { userId, productPackage } = req.body;
        const user = await getUserById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const message = `Dear ${user.name}, Congratulations & Welcome to Future Life Care Family. Your ID ${user.userId} Activated Successfully. Your Product Package (${productPackage}) will be delivered to you soon. Team FLC.`;
        await sendWhatsAppMessage(user.phone, message);
        res.json({ success: true, message: "Activation message sent!" });
    } catch (error) {
        console.error("Error sending activation message:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const sendPayoutWithdrawalMessage = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await getUserById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const message = `Dear ${user.name}, you have successfully raised your payout withdrawal request. Your payout will be credited within 48-72 hours after verification. Team FLC.`;
        await sendWhatsAppMessage(user.phone, message);
        res.json({ success: true, message: "Payout withdrawal message sent!" });
    } catch (error) {
        console.error("Error sending payout withdrawal message:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const sendPayoutCreditedMessage = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await getUserById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const message = `Dear ${user.name}, congratulations! Your payout has been successfully transferred to your bank account. Wait for bank update. Team FLC.`;
        await sendWhatsAppMessage(user.phone, message);
        res.json({ success: true, message: "Payout credited message sent!" });
    } catch (error) {
        console.error("Error sending payout credited message:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const sendEvoucherRequestMessage = async (req, res) => {
    try {
        const { userId, quantity } = req.body;
        const user = await getUserById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const message = `Dear ${user.name}, your request for ${quantity} e-vouchers has been successfully submitted. They will be transferred after verification. Team FLC.`;
        await sendWhatsAppMessage(user.phone, message);
        res.json({ success: true, message: "E-Voucher request message sent!" });
    } catch (error) {
        console.error("Error sending e-voucher request message:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const sendEvoucherDeliveredMessage = async (req, res) => {
    try {
        const { userId, quantity } = req.body;
        const user = await getUserById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const message = `Dear ${user.name}, your request for ${quantity} e-vouchers has been approved and they have been transferred to your FLC account. Team FLC.`;
        await sendWhatsAppMessage(user.phone, message);
        res.json({ success: true, message: "E-Voucher delivered message sent!" });
    } catch (error) {
        console.error("Error sending e-voucher delivered message:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    sendRegistrationMessage,
    sendActivationMessage,
    sendPayoutWithdrawalMessage,
    sendPayoutCreditedMessage,
    sendEvoucherRequestMessage,
    sendEvoucherDeliveredMessage
};
