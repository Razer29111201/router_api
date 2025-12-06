import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/proxy", async (req, res) => {
  try {
    const response = await fetch("YOUR_GAS_URL", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const json = await response.json();

    res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/json"
    });

    res.json(json);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.options("/proxy", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  });
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;   // ← BẮT BUỘC
app.listen(PORT, () =>
  console.log("Server running on port " + PORT)
);
