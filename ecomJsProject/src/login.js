document.addEventListener("DOMContentLoaded", () => {
  const registrationForm = document.querySelector(".registration-form form");
  const loginForm = document.querySelector(".login-form form");
  const logoutBtn = document.getElementById("logoutBtn");

  // -------------------------------
  // Helper Functions
  // -------------------------------
  function getUsers() {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  }

  function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  // -------------------------------
  // Registration Handler
  // -------------------------------
  if (registrationForm) {
    registrationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.querySelector("#username").value.trim();
      const email = document.querySelector("#email").value.trim();
      const password = document.querySelector("#password").value;

      if (!username || !email || !password) {
        alert("Please fill in all fields.");
        return;
      }

      const users = getUsers();

      if (users.some((user) => user.email === email)) {
        alert("Email already registered. Please login or use another email.");
        return;
      }

      const newUser = { username, email, password };
      users.push(newUser);
      saveUsers(users);

      sessionStorage.setItem("loggedIn", "true");
      sessionStorage.setItem("currentUser", JSON.stringify(newUser));

      localStorage.setItem("currentUserEmail", newUser.email);

      // alert("Registration successful!");
      registrationForm.reset();
      window.location.href = "home.html";
    });
  }

  // -------------------------------
  // Login Handler
  // -------------------------------
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.querySelector("#email1").value.trim();
      const password = document.querySelector("#password1").value;

      const users = getUsers();
      const matchedUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (matchedUser) {
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("currentUser", JSON.stringify(matchedUser));

        localStorage.setItem("currentUserEmail", matchedUser.email);

        console.log("session get", sessionStorage.getItem("currentUser"));

        loginForm.reset();
        window.location.href = "home.html";
      } else {
        alert("Invalid email or password.");
      }
    });
  }

  // -------------------------------
  // Logout Handler
  // -------------------------------
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const confirmation = confirm("Are you sure you want to log out?");
      if (!confirmation) return;

      sessionStorage.setItem("loggedIn", "false");
      sessionStorage.removeItem("currentUser");

      localStorage.removeItem("currentUserEmail");

      // alert("You have been logged out.");
      window.location.href = "index.html";
    });
  }
});
