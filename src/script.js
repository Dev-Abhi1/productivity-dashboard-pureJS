function display() {
  let elems = document.querySelectorAll(".elems");
  let fullPage = document.querySelectorAll(".fullPage");
  let back = document.querySelectorAll(".pageTop .back");
  elems.forEach((e) => {
    e.addEventListener("click", function () {
      fullPage[e.id].style.display = "block";
    });
  });

  back.forEach((e) => {
    e.addEventListener("click", function () {
      fullPage[e.id].style.display = "none";
    });
  });
}
display();


function weather() {
  let temp = document.querySelector(".temp h1");
  let city = document.querySelector(".temp h3");
  let humidity = document.querySelector("#humidity");
  let speed = document.querySelector("#speed");
  let key = "e8f5c77da33e6cb3fe78d5ca59825795";
  let ApiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  return async function checkweather() {
    let response = await fetch(ApiUrl + "Jaipur" + `&appid=${key}`);
    let data = await response.json();

    city.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp) + `°C`;
    speed.innerHTML = data.wind.speed + `km/h`;
    humidity.innerHTML = data.main.humidity + `%`;
  };
}

weather()();

function toDoPage() {
  const addTask = document.querySelector(".left-Tasks button");
  const task = document.querySelector(".input-tasks #task-input");
  const allTask = document.querySelector(".right-Tasks ul");


  let tasks = JSON.parse(localStorage.getItem("allTask")) || [];
  renderTasks();

  addTask.addEventListener("click", function (e) {
    e.preventDefault();
    const newTask = task.value.trim();

    if (newTask === "") {
      alert("Write Something..");
      return;
    }

    tasks.push(newTask);
    localStorage.setItem("allTask", JSON.stringify(tasks));
    task.value = "";
    renderTasks();
  });

  function renderTasks() {
    allTask.innerHTML = "";
    tasks.forEach((t, index) => {
      const taskItem = document.createElement("li");
      taskItem.textContent = t;

      const cross = document.createElement("span");
      cross.innerHTML = "x";
      cross.classList.add("close-btn");
      cross.addEventListener("click", function () {
        tasks.splice(index, 1); 
        localStorage.setItem("allTask", JSON.stringify(tasks));
        renderTasks(); 
      });

      taskItem.appendChild(cross);
      allTask.appendChild(taskItem);
    });
  }
}

toDoPage();

function dailyPlanner() {
  let dayPlanner = document.querySelector(".container");
  let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  var hours = Array.from(
    { length: 18 },
    (_, idx) => `${6 + idx}:00- ${7 + idx}:00`
  );

  let wholeDaySum = "";
  hours.forEach((value, idx) => {
    wholeDaySum =
      wholeDaySum +
      `     <div class="plans">
            <h4>${value}</h4>
            <input type="text" placeholder="---" id=${idx} value=${
        dayPlanData[idx] || ""
      } >
          </div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;

  let inputPlan = document.querySelectorAll(".plans input");

  inputPlan.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;

      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}

dailyPlanner();

async function motivation() {
  let response = await fetch("https://go-quote.azurewebsites.net/docs/");
  let data = await response.json();
  console.log(data);
  let quote = document.querySelector(".quotes-box .content p");
  let quoteAuthor = document.querySelector(".quotes-box .content h3");
  quote.innerHTML = data.text;
  quoteAuthor.innerHTML = `~ ` + data.author;
}

motivation();

function pomodoroTimer() {
  let totalSeconds = 25 * 60;
  let timerInterval = null;

  const timeDisplay = document.querySelector(".timer h1");
  const startBtn = document.querySelector(".timer #start-btn");
  const pauseBtn = document.querySelector(".timer #pause-btn");
  const resetBtn = document.querySelector(".timer #reset-btn");

  function updateDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timeDisplay.innerHTML =
      (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  function startTimer() {
    if (timerInterval !== null) return; 
    updateDisplay(); 
    timerInterval = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        return;
      }
      totalSeconds--;
      updateDisplay();
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  function resetTimer() {
    pauseTimer();
    totalSeconds = 25 * 60;
    updateDisplay();
  }

  
  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);

 
  updateDisplay();
}

pomodoroTimer()

function dailyGoals() {
  const goalList = document.querySelector(".goal-list");
  const goalForm = document.querySelector("#goal-form");
  const goalInput = document.querySelector("#goal-input");
  const whyInput = document.querySelector("#why-input");
  const bar = document.querySelector(".bar");
  const progressText = document.querySelector(".progress-text");

  const todayKey = new Date().toISOString().split("T")[0]; 
  let goals = JSON.parse(localStorage.getItem(todayKey)) || [];

  function saveGoals() {
    localStorage.setItem(todayKey, JSON.stringify(goals));
  }

  function updateProgress() {
    const completed = goals.filter((g) => g.done).length;
    const percent = goals.length ? Math.round((completed / goals.length) * 100) : 0;
    bar.style.width = percent + "%";
    progressText.textContent = `${percent}% Complete`;

    
    if (percent === 100 && goals.length > 0) {
      setTimeout(() => {
        alert("🔥 You completed all your goals! Reflect: What made you succeed today?");
      }, 300);
    }
  }

  function renderGoals() {
    goalList.innerHTML = "";

    goals.forEach((goal, idx) => {
      const li = document.createElement("li");

      const left = document.createElement("div");
      left.className = "left";
      const goalText = document.createElement("span");
      goalText.className = "goal-text";
      goalText.textContent = goal.text;

      const whyText = document.createElement("span");
      whyText.className = "why";
      whyText.textContent = `Why: ${goal.why}`;

      left.appendChild(goalText);
      left.appendChild(whyText);

      const right = document.createElement("div");
      right.className = "right";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = goal.done;
      checkbox.addEventListener("change", () => {
        goals[idx].done = !goals[idx].done;
        saveGoals();
        renderGoals();
      });

      const mood = document.createElement("select");
      ["😊", "😐", "😫", "💪"].forEach((m, i) => {
        const option = document.createElement("option");
        option.value = m;
        option.textContent = m;
        if (goal.mood === m) option.selected = true;
        mood.appendChild(option);
      });

      mood.addEventListener("change", () => {
        goals[idx].mood = mood.value;
        saveGoals();
      });

      right.appendChild(checkbox);
      right.appendChild(mood);

      li.appendChild(left);
      li.appendChild(right);
      goalList.appendChild(li);
    });

    updateProgress();
  }

  goalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const goalText = goalInput.value.trim();
    const whyText = whyInput.value.trim();

    if (!goalText || !whyText || goals.length >= 5) return;

    goals.push({ text: goalText, why: whyText, done: false, mood: "😊" });
    goalInput.value = "";
    whyInput.value = "";
    saveGoals();
    renderGoals();
  });

  renderGoals();
}


dailyGoals()
