const teams = [

  { name: "Algeria", flag: "🇩🇿" },
  { name: "Argentina", flag: "🇦🇷" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "Austria", flag: "🇦🇹" },
  { name: "Belgium", flag: "🇧🇪" },
  { name: "Bosnia and Herzegovina", flag: "🇧🇦" },
  { name: "Brazil", flag: "🇧🇷" },
  { name: "Cabo Verde", flag: "🇨🇻" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Colombia", flag: "🇨🇴" },
  { name: "Croatia", flag: "🇭🇷" },
  { name: "Czechia", flag: "🇨🇿" },
  { name: "Curaçao", flag: "🇨🇼" },
  { name: "DR Congo", flag: "🇨🇩" },
  { name: "Ecuador", flag: "🇪🇨" },
  { name: "Egypt", flag: "🇪🇬" },
  { name: "England", flag: "🏴" },
  { name: "France", flag: "🇫🇷" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "Ghana", flag: "🇬🇭" },
  { name: "Haiti", flag: "🇭🇹" },
  { name: "Iran", flag: "🇮🇷" },
  { name: "Iraq", flag: "🇮🇶" },
  { name: "Ivory Coast", flag: "🇨🇮" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Jordan", flag: "🇯🇴" },
  { name: "Mexico", flag: "🇲🇽" },
  { name: "Morocco", flag: "🇲🇦" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "New Zealand", flag: "🇳🇿" },
  { name: "Norway", flag: "🇳🇴" },
  { name: "Panama", flag: "🇵🇦" },
  { name: "Paraguay", flag: "🇵🇾" },
  { name: "Portugal", flag: "🇵🇹" },
  { name: "Qatar", flag: "🇶🇦" },
  { name: "Saudi Arabia", flag: "🇸🇦" },
  { name: "Scotland", flag: "🏴" },
  { name: "Senegal", flag: "🇸🇳" },
  { name: "South Africa", flag: "🇿🇦" },
  { name: "South Korea", flag: "🇰🇷" },
  { name: "Spain", flag: "🇪🇸" },
  { name: "Sweden", flag: "🇸🇪" },
  { name: "Switzerland", flag: "🇨🇭" },
  { name: "Tunisia", flag: "🇹🇳" },
  { name: "Türkiye", flag: "🇹🇷" },
  { name: "United States", flag: "🇺🇸" },
  { name: "Uruguay", flag: "🇺🇾" },
  { name: "Uzbekistan", flag: "🇺🇿" }

];



const team1Select = document.getElementById("team1");
const team2Select = document.getElementById("team2");

const flag1 = document.getElementById("flag1");
const flag2 = document.getElementById("flag2");

const football = document.getElementById("football");
const loadingText = document.getElementById("loadingText");

const result = document.getElementById("result");
const scorePrediction =
document.getElementById("scorePrediction");


const history =
document.getElementById("history");

const crowdSound =
document.getElementById("crowdSound");

const whistleSound =
document.getElementById("whistleSound");

const emptyHistory =
document.querySelector(".empty-history");

function playSound(audio) {

  if (!audio || !audio.getAttribute("src")) {
    return;
  }

  audio.currentTime = 0;

  audio.play()
  .catch(() => {});
}

/* Populate Teams */

teams.forEach(team => {

  let option1 =
  new Option(`${team.flag} ${team.name}`, team.name);

  let option2 =
  new Option(`${team.flag} ${team.name}`, team.name);

  team1Select.add(option1);
  team2Select.add(option2);
});

team2Select.selectedIndex = 1;
updateFlag(team1Select, flag1);
updateFlag(team2Select, flag2);

/* Update Flags */

function updateFlag(select, flagDiv) {

  const selected =
  teams.find(t => t.name === select.value);

  if (selected) {

    flagDiv.innerHTML = selected.flag;
  }
}

team1Select.addEventListener("change", () => {
  updateFlag(team1Select, flag1);
});

team2Select.addEventListener("change", () => {
  updateFlag(team2Select, flag2);
});

/* Theme Toggle */

const themeBtn =
document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("light-mode");

  if (
    document.body.classList.contains("light-mode")
  ) {

    themeBtn.innerHTML = "Dark";

  } else {

    themeBtn.innerHTML = "Light";
  }
});


/* Predict Match */

document.getElementById("predictBtn")
.addEventListener("click", () => {

  const team1 = team1Select.value;
  const team2 = team2Select.value;

  if (!team1 || !team2) {

    alert("Select teams.");
    return;
  }

  if (team1 === team2) {

    alert("Choose different teams.");
    return;
  }

  result.innerHTML = "";

  football.style.display = "block";

  football.classList.add("loading");

  loadingText.style.display = "block";

  /* Crowd Sound */

  playSound(crowdSound);

  setTimeout(() => {

    football.classList.remove("loading");

    loadingText.style.display = "none";

    /* Whistle Sound */

    playSound(whistleSound);

    /* Score generation */

    const goals1 =
    Math.floor(Math.random() * 5);

    const goals2 =
    Math.floor(Math.random() * 5);

    scorePrediction.innerHTML =
      `${team1} ${goals1} - ${goals2} ${team2}`;

    /* Match Result */

    let matchResult = "";

    if (goals1 > goals2) {

      matchResult =
      `🏆 ${team1} Wins!`;

    } else if (goals2 > goals1) {

      matchResult =
      `🏆 ${team2} Wins!`;

    } else {

      matchResult =
      `🤝 Match Draw`;
    }

    result.innerHTML = matchResult;

    /* Confetti */

    if (window.confetti) {
      confetti({

        particleCount: 200,

        spread: 100
      });
    }

    /* Save History */

    const li =
    document.createElement("li");

    li.innerHTML =
      `${team1} ${goals1}-${goals2} ${team2}`;

    if (emptyHistory) {
      emptyHistory.remove();
    }

    history.prepend(li);

  }, 4000);

});
