document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const displayName = document.getElementById("displayName").value;
    const dateOfBirth = document.getElementById("dateOfBirth").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password != confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Registering user:", {
      name,
      displayName,
      email,
      password,
      dateOfBirth,
    });
    fetch("http://localhost:3448/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        displayName: displayName,
        email: email,
        password: password,
        dateOfBirth: dateOfBirth,
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
