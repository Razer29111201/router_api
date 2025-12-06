import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// Proxy endpoint
app.post("/proxy", async (req, res) => {
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbzFwUtiMQIL4TBLh-8ORkDoL55iAuC2dWDRA_mn_nvTMPIiJsu_CYXYOF628R_DtZ0v/exec", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body)
        });

        const text = await response.text();

        res.set({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/json"
        });

        res.send(text);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CORS preflight
app.options("/proxy", (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
    });
    res.sendStatus(200);
});

app.listen(3000, () => console.log("Server running"));
