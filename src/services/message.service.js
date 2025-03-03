const client = require("../../config/whatsAppClient");

const sendWhatsAppMessage = async (phoneNumber, message) => {
    try {
        await client.sendMessage(`${phoneNumber}@c.us`, message);
        console.log("Message sent to:", phoneNumber);
    } catch (error) {
        console.error("Error sending message:", error);
    }
};

module.exports = { sendWhatsAppMessage };
