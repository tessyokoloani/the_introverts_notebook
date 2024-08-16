// document.addEventListener("DOMContentLoaded", () => {
//   fetch("http://localhost:3448/api/user/")
//     .then((response) => response.json())
//     .then((data) => {
//       const userList = document.getElementById("userList");
//       data.forEach((content) => {
//         const li = document.createElement("li");

//         // li.innerHTML = <h2>${content.title}</h2>;
//         // li.innerHTML = <h3>${content.content}</h3>;
//         // li.innerHTML = <h4>${content.author}</h4>;
//         li.textContent = `Name: ${content.displayName}, Email: ${content.email}`;
//         userList.appendChild(li);
//       });
//     })
//     .catch((error) => console.error("Error fetching data:", error));
// });

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3448/api/content/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const contentList = document.getElementById("contentList");
      data.forEach((content) => {
        const h3 = document.createElement("h3");
        const p = document.createElement("p");
        const h5 = document.createElement("h5");

        h3.innerHTML = `Title: ${content.title}`;
        p.innerHTML = ` ${content.content}`;
        h5.innerHTML = `Author: ${content.author}`;
        contentList.appendChild(h3);
        contentList.appendChild(p);
        contentList.appendChild(h5);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
