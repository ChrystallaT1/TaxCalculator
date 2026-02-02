document.addEventListener("DOMContentLoaded", () => {
  const calcBtn = document.getElementById("calc-btn");

  calcBtn.addEventListener("click", async () => {
    // Step 5: Extract values including bonusIncome
    const a = document.getElementById("income").value;
    const b = document.getElementById("savings").value;
    const c = document.getElementById("bonus").value;

    const errorDiv = document.getElementById("error-message");
    errorDiv.textContent = "";

    // Reset results
    document.getElementById("tax-income-result").textContent = "";
    document.getElementById("tax-savings-result").textContent = "";
    document.getElementById("tax-bonus-result").textContent = "";

    try {
      // Step 5: Post bonusIncome (c) together with api request
      const response = await fetch("/api/calcTax", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ a, b, c }),
      });

      const data = await response.json();

      if (response.ok) {
        // Step 5: Unpack json objects and display taxOnBonus
        document.getElementById("tax-income-result").textContent =
          ` Tax: £${data.taxIncome}`;
        document.getElementById("tax-savings-result").textContent =
          ` Tax: £${data.taxSavings}`;
        document.getElementById("tax-bonus-result").textContent =
          ` Tax: £${data.taxBonus}`;
      } else {
        // Display errors
        const msg =
          data.error1 || data.error2 || data.error4 || "An error occurred";
        errorDiv.textContent = msg;
      }
    } catch (error) {
      errorDiv.textContent = "Failed to connect to the server.";
    }
  });
});
