document
  .getElementById("deleteContent")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("deleteTitle").value;
    const email = document.getElementById("deleteEmail").value;

    console.log("Editing content:", {
      title,
      email,
    });
    fetch("http://localhost:3448/api/content/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        email: email,
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
