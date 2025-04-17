const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const path = require("path");

app.use(express.static(__dirname));

let lastPrices = [1.0850, 1.0853, 1.0857]; // initial dummy data

function getPrediction(prices) {
  const [a, b, c] = prices;
  if (a < b && b < c) return "UP";
  if (a > b && b > c) return "DOWN";
  return "SIDEWAYS";
}

async function getLivePrice() {
  // Simulated - Replace with real scraping or WebSocket logic
  const latest = lastPrices[2];
  const newPrice = parseFloat((latest + (Math.random() - 0.5) * 0.001).toFixed(5));
  return newPrice;
}

app.get("/predict", async (req, res) => {
  const newPrice = await getLivePrice();
  const prediction = getPrediction(lastPrices);
  const result = newPrice > lastPrices[2] ? "UP" : newPrice < lastPrices[2] ? "DOWN" : "SIDEWAYS";
  lastPrices.shift();
  lastPrices.push(newPrice);

  res.json({
    prices: lastPrices.map(p => p.toFixed(5)),
    prediction,
    result,
    newPrice: newPrice.toFixed(5)
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log("Server running on http://localhost:" + PORT));