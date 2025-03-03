const express = require("express");
const {
    sendRegistrationMessage,
    sendActivationMessage,
    sendPayoutWithdrawalMessage,
    sendPayoutCreditedMessage,
    sendEvoucherRequestMessage,
    sendEvoucherDeliveredMessage
} = require("../controllers/message.controller");

const router = express.Router();

router.post("/send-registration-message", sendRegistrationMessage);
router.post("/send-activation-message", sendActivationMessage);
router.post("/send-payout-withdrawal-message", sendPayoutWithdrawalMessage);
router.post("/send-payout-credited-message", sendPayoutCreditedMessage);
router.post("/send-evoucher-request-message", sendEvoucherRequestMessage);
router.post("/send-evoucher-delivered-message", sendEvoucherDeliveredMessage);

module.exports = router;
