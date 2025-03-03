const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
    authStrategy: new LocalAuth(), // Stores session locally
    puppeteer: { headless: true }
});

client.on("qr", (qr) => {
    console.log("Scan this QR code with your admin WhatsApp:");
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("WhatsApp Client is ready!");
});

client.on("authenticated", () => {
    console.log("Client is authenticated!");
});

client.on("auth_failure", (msg) => {
    console.error("Authentication failure:", msg);
});

client.initialize();

const sendWhatsAppMessage = async (phone, message) => {
    try {
        await client.sendMessage(phone + "@c.us", message);
        console.log(`Message sent to ${phone}`);
    } catch (error) {
        console.error("Error sending message:", error);
    }
};

module.exports = { sendWhatsAppMessage, client };
