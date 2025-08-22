if (sessionStorage.getItem("loggedIn") !== "true") {
  // alert("You must be logged in to view this page.");
  window.location.href = "index.html";
}

if (sessionStorage.getItem("loggedIn") !== "true") {
  window.location.replace("index.html");
} else {
  // Show page only if logged in
  document.body.style.display = "block";
}
