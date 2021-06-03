//* Theme
let theme;
updateTheme();

function updateTheme() {
  theme = localStorage.getItem("theme") || "light";

  document.getElementById("themeIcon").className =
    theme === "light" ? "fa-lg fas fa-moon" : "fa-lg fas fa-sun";
  document.querySelector("html").setAttribute("data-theme", theme);
}

function changeTheme() {
  if (theme === "light") {
    theme = "dark";
  } else {
    theme = "light";
  }

  document.getElementById("themeIcon").className =
    theme === "light" ? "fa-lg fas fa-moon" : "fa-lg fas fa-sun";

  document.querySelector("html").setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  updateTheme();
}

//* Main
const questionInput = document.getElementById("questionInput");
const questionBtn = document.getElementById("questionBtn");

questionBtn.onclick = () => fetchAnswer(questionInput.value);

function fetchAnswer(query) {
  const params = encodeURIComponent(query);
  const apiUri = "https://8ball.delegator.com/magic/JSON/" + params;

  questionInput.value = "";
  questionBtn.classList.add("loading");
  questionBtn.innerText = "Loading";

  fetch(apiUri)
    .then((response) => response.json())

    .then((json) => {
      const answerPara = document.getElementById("answer");

      const { question, answer } = json.magic;
      answerPara.innerHTML = `
      <p class="border-left"><i class="fas fa-question text-red-500"></i> Asked: ${
        question.includes("?") ? question : question + "?"
      }</p> 
      <p><i class="fas fa-comment text-green-500"></i> Answer: ${answer}</p>`;

      questionBtn.classList.remove("loading");
      questionBtn.innerText = "Submit";
    });
}
