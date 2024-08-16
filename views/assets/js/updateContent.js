document.getElementById("editContent").addEventListener("submit", function (e) {
  e.preventDefault();
  const content = document.getElementById("ContentToEdit").value;
  const title = document.getElementById("editTitle").value;
  const email = document.getElementById("editEmail").value;
  const public = document.getElementById("editPublic").value;

  console.log("Editing content:", {
    title,
    content,
    email,
    public,
  });
  fetch("http://localhost:3448/api/content/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
      email: email,
      public: public,
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
