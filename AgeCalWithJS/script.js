window.addEventListener("DOMContentLoaded", () => {
  let userInput = document.getElementById("date");
  let result = document.getElementById("result");
  let hiddenPicker = document.getElementById("hiddenDatePicker");
  hiddenPicker.max = new Date().toISOString().split("T")[0];
  

  
  // Format text input into DD-MM-YYYY as user types
  userInput.addEventListener("input", () => {
    let value = userInput.value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);

    let formatted = "";
    if (value.length > 0) formatted += value.slice(0, 2);
    if (value.length > 2) formatted += "-" + value.slice(2, 4);
    if (value.length > 4) formatted += "-" + value.slice(4, 8);

    userInput.value = formatted;
  });

  // Button opens hidden date input
  document.getElementById("datePickerBtn").addEventListener("click", () => {
    hiddenPicker.click();
  });

  // When a date is picked, update text input in DD-MM-YYYY format
  hiddenPicker.addEventListener("change", (e) => {
    let date = e.target.value;
    if (date) {
      let parts = date.split("-");
      userInput.value = `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
  });

  // Calculate age logic
  window.calculateAge = function () {
    let parts = userInput.value.split("-");
    if (parts.length !== 3) {
      result.innerHTML = "Please enter a valid date in DD-MM-YYYY format.";
      return;
    }

    let d1 = parseInt(parts[0], 10);
    let m1 = parseInt(parts[1], 10);
    let y1 = parseInt(parts[2], 10);

    if (!isValidDate(d1, m1, y1)) {
      result.innerHTML = "Please enter a valid date.";
      return;
    }

    let today = new Date();
    let d2 = today.getDate();
    let m2 = today.getMonth() + 1;
    let y2 = today.getFullYear();

    let d3, m3, y3;
    y3 = y2 - y1;

    if (m2 >= m1) {
      m3 = m2 - m1;
    } else {
      y3--;
      m3 = 12 + m2 - m1;
    }

    if (d2 >= d1) {
      d3 = d2 - d1;
    } else {
      m3--;
      d3 = getDaysInMonth(y1, m1) + d2 - d1;
    }

    if (m3 < 0) {
      m3 = 11;
      y3--;
    }

    result.innerHTML = `You are <span>${y3}</span> years, <span>${m3}</span> months and <span>${d3}</span> days old.`;
  };

  // Helper: Get number of days in a month
  function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  // Helper: Validate date correctness
  function isValidDate(d, m, y) {
    let testDate = new Date(y, m - 1, d);
    return (
      testDate.getFullYear() === y &&
      testDate.getMonth() === m - 1 &&
      testDate.getDate() === d
    );
  }
});
