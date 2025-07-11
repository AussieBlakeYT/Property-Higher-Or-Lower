let currentRegion = "";
let priceA = 0;
let priceB = 0;
let score = 0;

function startGame(region) {
  currentRegion = region;
  document.getElementById("region-name").innerText = "Region: " + region;
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";
  score = 0;
  document.getElementById("score").innerText = "Score: 0";
  newRound();
}

function getRandomPrice(region) {
  if (region === "Australia") {
    return Math.floor(Math.random() * 2000000) + 200000; // $200k - $2.2m
  } else {
    return Math.floor(Math.random() * 1000000) + 100000; // £100k - £1.1m
  }
}

function newRound() {
  priceA = getRandomPrice(currentRegion);
  priceB = getRandomPrice(currentRegion);
  document.getElementById("price-a").innerText = formatPrice(priceA);
  document.querySelector(".property:nth-child(3) p").innerText = "?";
  document.getElementById("result").innerText = "";
}

function formatPrice(price) {
  let symbol = currentRegion === "Australia" ? "$" : "£";
  return symbol + price.toLocaleString();
}

function guess(choice) {
  let correct = (priceB > priceA && choice === "higher") || 
                (priceB < priceA && choice === "lower");
  document.querySelector(".property:nth-child(3) p").innerText = formatPrice(priceB);
  
  if (priceA === priceB) {
    document.getElementById("result").innerText = "It's a draw! No points.";
  } else if (correct) {
    score++;
    document.getElementById("result").innerText = "Correct!";
  } else {
    document.getElementById("result").innerText = "Wrong! Game over.";
    score = 0;
  }

  document.getElementById("score").innerText = "Score: " + score;
  setTimeout(newRound, 1500);
}
