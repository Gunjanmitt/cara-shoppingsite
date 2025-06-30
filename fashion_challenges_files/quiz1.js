function submitQuiz() {
  const answers = {
    q1: "c",
    q2: "c",
    q3: "d",
    q4: "b",
    q5: "b"
  };

  let score = 0;
  for (let q in answers) {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    if (selected && selected.value === answers[q]) score++;
  }

  const result = document.getElementById("result");
  if (score === 5) {
    const coupon = "QUIZ" + Math.floor(1000 + Math.random() * 9000);
    result.innerHTML = `🎉 Perfect! You earned a coupon: <span style="color: green;">${coupon}</span>`;
    localStorage.setItem("fashionQuizCoupon", coupon);
    setTimeout(() => window.location.href = "challenge.html", 3000);
  } else {
    result.innerHTML = `You scored ${score}/5. Get all correct to earn a coupon. Try again!`;
    result.style.color = "orange";
  }
}