async function runPrediction() {
  document.getElementById("prediction").textContent = "Predicting...";
  const res = await fetch("/predict");
  const data = await res.json();
  const { prices, prediction, result, newPrice } = data;

  document.getElementById("prices").textContent = prices.join(", ");
  const predElem = document.getElementById("prediction");
  predElem.textContent = prediction;
  predElem.className = prediction.toLowerCase();

  const resElem = document.getElementById("result");
  resElem.textContent = result + " (Next: " + newPrice + ")";
  resElem.className = result.toLowerCase();
}