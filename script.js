document.addEventListener("DOMContentLoaded", function () {
    // Registration
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            localStorage.setItem("username", username);
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);

            alert("Registration successful! Please login.");
            window.location.href = "login.html";
        });
    }

    // Login
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const savedEmail = localStorage.getItem("email");
            const savedPassword = localStorage.getItem("password");

            if (email === savedEmail && password === savedPassword) {
                localStorage.setItem("isLoggedIn", "true");
                alert("Login successful!");
                window.location.href = "home.html";
            } else {
                alert("Invalid credentials. Please try again.");
            }
        });
    }
});
