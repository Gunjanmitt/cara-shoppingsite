document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("levelBtn");
  const message = document.getElementById("levelMessage");

  let clicks = 0;
  const goal = 10;

  btn.addEventListener("click", () => {
    clicks++;
    if (clicks >= goal) {
      message.innerHTML = `🎉 Level Complete! You earned a 10% OFF coupon: <strong>LEVEL${Math.floor(1000 + Math.random() * 9000)}</strong>`;
      localStorage.setItem("levelCompleted", "true");
      setTimeout(() => window.location.href = "challenge.html", 3000);
    } else {
      btn.innerText = `Tap ${goal - clicks} more times to complete`;
    }
  });
});
