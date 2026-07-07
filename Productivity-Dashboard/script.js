

let elem = document.querySelectorAll(".elem");
let fullpages = document.querySelector('.fullpages')
let fullpage = document.querySelectorAll(".fullpage")
let closebtn = document.querySelectorAll(".clsbtn");

// Theme switching logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themes = ['theme1', 'theme2', 'theme3', 'theme4', 'theme5', 'theme6', 'theme7'];
let currentThemeIndex = parseInt(localStorage.getItem('themeIndex')) || 0;

// Initialize theme
document.documentElement.setAttribute('data-theme', themes[currentThemeIndex]);

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        let newTheme = themes[currentThemeIndex];
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('themeIndex', currentThemeIndex);
    });
}

const Functions = [ToDo, DailyPlanner, Motivation, PomodoroTimer, DailyGoal]

elem.forEach((elem) => {
    elem.addEventListener("click", () => {
        console.log(elem.id)
        fullpage[elem.id].style.display = "block";
        fullpages.style.pointerEvents = "all"
        Functions[elem.id]();
    })
})

closebtn.forEach((elem) => {
    elem.addEventListener("click", () => {
        fullpage[elem.id].style.display = "none";
        fullpages.style.pointerEvents = "none"
    })
})

function ToDo() {

    let form = document.querySelector(".form")
    let input = document.querySelector("input");
    let textarea = document.querySelector("textarea")
    let checkbox = document.querySelector("#important")
    let taskbox = document.querySelector(".right")

    const alltask = JSON.parse(localStorage.getItem('alltasks')) || [];
    const getData = () => {
        const task = {
            tittle: input.value,
            description: textarea.value,
            isimportant: checkbox.checked,
            ispending: true,
            iscompleted: false,
        }

        alltask.push(task);
        console.log(alltask)
        localStorage.setItem("alltasks", JSON.stringify(alltask));
        rendertask();
    }

    function rendertask() {
        taskbox.innerHTML = "";
        alltask.forEach(elem => {
            const task = document.createElement("div");
            task.className = "task";

            task.innerHTML = `
    <h4>${elem.tittle}<span>imp</span></h4>
<div>
  <button key="mark">Mark as Completed</button>                        
  <button class="delete" key="del">Delete</button>
</div>
    `;
            if (elem.isimportant) {
                task.classList.add("important")
            } else if (elem.ispending) {
                task.classList.add("pending")
            } else if (elem.iscompleted) {
                task.classList.add("completed");
            }

            task.addEventListener("click", (e) => {
                console.log(e.target.getAttribute("key"))
                if (e.target.getAttribute("key") === "mark") {
                    // console.log("task is completed");    
                    elem.isimportant = false;
                    elem.ispending = false;
                    elem.iscompleted = true;
                    localStorage.setItem("alltasks", JSON.stringify(alltask));
                } else {
                    if (e.target.getAttribute("key") === 'del') {
                        const index = alltask.indexOf(elem);
                        alltask.splice(index, 1);

                        localStorage.setItem("alltasks", JSON.stringify(alltask));

                        rendertask();

                    }
                }
                rendertask()
            });

            taskbox.appendChild(task);
        })
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault()
        getData()
    })
    rendertask()
}

function DailyPlanner() {

    let plansdiv = document.querySelector('.plansdiv');
    plansdiv.innerHTML = "";

    const timers = Array.from({ length: 18 }, (elem, indx) => indx);


    let times = timers.map(t => {
        return `${t + 6} - ${t + 7}`
    });

    times.forEach(time => {
        const plan = document.createElement('div');
        plan.classList.add('plan')
        plan.innerHTML = `<span>${time}</span>
                    <input type="text">`
        plansdiv.appendChild(plan);
    })
    let planinputs = document.querySelectorAll(".plan input")
    // console.log(planinputs)
    let plandata = JSON.parse(localStorage.getItem('plandata')) || []
    const renderplan = planinputs.forEach((plan, id) => {
        plan.value = plandata[id] || "";
    })
    planinputs.forEach((plan, id) => {
        plan.addEventListener("input", (e) => {
            plandata[id] = e.target.value;
            localStorage.setItem('plandata', JSON.stringify(plandata));
            renderplan();
        })
    })

}

function Motivation() {

    function renderQuotes(data) {
        let qoutediv = document.querySelector(".quote");
        let authordiv = document.querySelector(".author");

        qoutediv.innerText = data.quote;
        authordiv.innerText = data.author
    }

    async function FetchQuotes() {
        let response = await fetch("https://motivational-spark-api.vercel.app/api/quotes/random");
        let data = await response.json();
        console.log("Data", data)

        renderQuotes(data)
    }

    FetchQuotes()
}

function PomodoroTimer() {
    let timerContainer = document.querySelector(".timerContainer");
    let timer = document.querySelector(".timer");
    let start = document.querySelector(".start");
    let stop = document.querySelector(".stop");
    let reset = document.querySelector(".reset");
    let time = document.querySelector("#time");
    let status = document.querySelector(".status");
    let session = "work";

    let totalSeconds = 25 * 60;
    let interval;

    start.addEventListener("click", startTimer);
    stop.addEventListener("click", stopTimer);
    reset.addEventListener("click", resetTimer);

    function startTimer() {
        start.style.display = "none";
        stop.style.display = "block";
        reset.style.display = "block";

        console.log("Timer started")

        interval = setInterval(function () {

            let minutes = parseInt(totalSeconds / 60);
            let seconds = totalSeconds % 60;

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            time.innerHTML = `${minutes}:${seconds}`;

            totalSeconds--;

            if (totalSeconds < 0) {
                clearInterval(interval);
                timerContainer.style.pointerEvents = "all";
                start.style.display = "block";
                stop.style.display = "none";
                reset.style.display = "none";
                status.innerHTML = "Break Session";
                if (session === "work") {
                    time.innerHTML = "05:00";
                    totalSeconds = 5 * 60;
                    session = "break";
                } else {
                    time.innerHTML = "25:00";
                    totalSeconds = 25 * 60;
                    session = "work";
                }
            }
        }, 1000);
    }

    function stopTimer() {
        console.log("Timer stopped")
        clearInterval(interval);
        timerContainer.style.pointerEvents = "all";
        start.style.display = "block";
        stop.style.display = "none";
        reset.style.display = "none";
    }

    function resetTimer() {
        console.log("Timer reset")
        clearInterval(interval);
        totalSeconds = 25 * 60;
        time.innerHTML = "25:00";
        timerContainer.style.pointerEvents = "all";
        start.style.display = "block";
        stop.style.display = "none";
        reset.style.display = "none";
    }

}

function DailyGoal() {
    let input = document.getElementById("goal-input");
    let addBtn = document.getElementById("add-goal-btn");
    let goalsList = document.getElementById("goals-list");
    let progressText = document.getElementById("goal-progress-text");
    let clearBtn = document.getElementById("clear-completed-goals-btn");

    let goals = JSON.parse(localStorage.getItem('dailyGoals')) || [];

    function updateProgress() {
        let completedCount = goals.filter(g => g.completed).length;
        if (goals.length === 0) {
            progressText.innerText = `No goals yet. Add one above!`;
        } else {
            progressText.innerText = `${completedCount} of ${goals.length} completed`;
        }
    }

    function renderGoals() {
        goalsList.innerHTML = "";
        goals.forEach((goal, index) => {
            let li = document.createElement("li");
            li.className = `goal-item ${goal.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <span class="goal-text">${goal.text}</span>
                <button data-index="${index}">${goal.completed ? 'Undo' : 'Complete'}</button>
            `;
            goalsList.appendChild(li);
        });
        updateProgress();
    }

    function addGoal() {
        let text = input.value.trim();
        if (text) {
            goals.push({ text: text, completed: false });
            localStorage.setItem('dailyGoals', JSON.stringify(goals));
            input.value = "";
            renderGoals();
        }
    }

    addBtn.addEventListener("click", addGoal);

    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addGoal();
    });

    goalsList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            let index = e.target.getAttribute("data-index");
            goals[index].completed = !goals[index].completed;
            localStorage.setItem('dailyGoals', JSON.stringify(goals));
            renderGoals();
        }
    });

    clearBtn.addEventListener("click", () => {
        goals = goals.filter(g => !g.completed);
        localStorage.setItem('dailyGoals', JSON.stringify(goals));
        renderGoals();
    });

    renderGoals();
}

async function FetchWheatherData() {
    const response = await fetch("https://api.weatherapi.com/v1/current.json?key=6ad476d133c94fb6bf550335251012&q=Daltonganj&aqi=no");
    const data = await response.json();
    console.log(data);

    let tempdiv = document.querySelector(".temp");
    let citydiv = document.querySelector(".city");
    let icondiv = document.querySelector(".icon");
    icondiv.innerHTML = "";

    let img = document.createElement("img");
    let span = document.createElement("span");
    img.src = data.current.condition.icon;
    span.innerText = data.current.condition.text;
    icondiv.appendChild(img);
    icondiv.appendChild(span);

    tempdiv.innerHTML = data.current.temp_c + "°C";
    citydiv.innerHTML = data.location.name;

    let possibility = document.querySelector(".possibility");
    let humidity = document.querySelector(".humidity");
    let wind = document.querySelector(".wind");
    possibility.innerHTML = "Cloud:" + data.current.cloud + "%";
    humidity.innerHTML = "Humidity:" + data.current.humidity + "%";
    wind.innerHTML = "Wind:" + data.current.wind_kph + "km/h";


}

function Dashboard() {
    let time = document.querySelector(".time");
    let date = document.querySelector(".date");
    let dashboard = document.querySelector(".dashboard");
    // let wheather=document.querySelector(".wheather");
    setInterval(function () {
        const now = new Date();

        const formatedDate = now.toLocaleDateString("en-US", {
            month: "long",
        });

        const numDay = now.getDate();
        const year = now.getFullYear();

        const day = now.toLocaleDateString("en-US", {
            weekday: "long"
        });

        const formatedTime = now.toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true
        });

        const hour = now.getHours(); // 0 - 23


        let greeting = "";

        if (hour >= 5 && hour < 12) {
            dashboard.style.backgroundImage = "url('./images/morning3.jpg')";
        } else if (hour >= 12 && hour < 17) {
            // greeting = "Afternoon";

            dashboard.style.backgroundImage = "url('./images/afternoon.jpg')";
        } else if (hour >= 17 && hour < 21) {
            // greeting = "Evening";

            dashboard.style.backgroundImage = "url('./images/evening.jpg')";
        } else {
            // greeting = "Night";

            dashboard.style.backgroundImage = "url('./images/night.jpg')";
        }

        time.innerHTML = `${day}, ${formatedTime}`;
        date.innerHTML = `${numDay} ${formatedDate}, ${year}`;


    }, 1000)

    FetchWheatherData();


    // wheather.innerHTML=now.toLocaleDateString();
}


Dashboard();
