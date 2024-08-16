document.getElementById("postContent").addEventListener("submit", function (e) {
  e.preventDefault();
  const content = document.getElementById("content").value;
  const title = document.getElementById("contentTitle").value;
  const email = document.getElementById("email").value;
  const public = document.getElementById("public").value;

  console.log("Posting content:", {
    title,
    content,
    email,
    public,
  });
  fetch("http://localhost:3448/api/content", {
    method: "POST",
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
