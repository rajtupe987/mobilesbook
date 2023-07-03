

// Handle form submission for sign-up
document.getElementById("signupForm").addEventListener("submit", function (event) {
  event.preventDefault();
  
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const isDoctor = document.getElementById("isDoctor").checked;

  const newUser = { username, email, password, isDoctor };

  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("User registered successfully!");
      console.log(data);
    })
    .catch((error) => {
      alert("Error occurred during registration.");
      console.error(error);
    });
});

// Handle form submission for login
document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const loginEmail = document.getElementById("loginEmail").value;
  const loginPassword = document.getElementById("loginPassword").value;

  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((users) => {
      const user = users.find((u) => u.email === loginEmail && u.password === loginPassword);

      if (user) {
        alert("Login successful!");
        if (user.isDoctor) {
          window.location.href = "../frontend/app.html";
        } else {
          window.location.href = "../frontend/bookapp.html";
        }
      } else {
        alert("Login failed!");
      }
    })
    .catch((error) => {
      alert("Error occurred during login.");
      console.error(error);
    });
});









