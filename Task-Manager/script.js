document.documentElement.setAttribute('data-theme', 'light');
const themeButton = document.querySelector('.themeButton');
const AddTask = document.querySelector('.addTask');
const closeForm = document.querySelector('.ri-close-line');
const form = document.querySelector('form');
const TaskContainer = document.querySelector('.Task-container');

let filterCategory = document.querySelector('#filterCategory');
let Task;
let editIndex=null;
let currentCategory = "all";

themeButton.addEventListener("click", function () {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    console.log(currentTheme);
    if (currentTheme == 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeButton.innerHTML = '<i class="ri-moon-line"></i>';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeButton.innerHTML = '<i class="ri-sun-line"></i>';
    }
});

AddTask.addEventListener("click", function () {
    document.querySelector('.form-overlay').classList.add('active');
})

closeForm.addEventListener("click", function () {
    document.querySelector('.form-overlay').classList.remove('active');
})


filterCategory.addEventListener("change", function () {
    currentCategory = filterCategory.value;
    RenderTask();
})


let task =JSON.parse(localStorage.getItem('task')) || [];

console.log(task);

form.addEventListener("submit", function (e) {
    e.preventDefault();
    document.querySelector('.form-overlay').classList.remove('active');
    const title = document.querySelector("form input").value.trim();
    if(!title){
        return;
    }
    const category = document.querySelector("#category").value;
    const date = new Date().toLocaleDateString();
    const priority = document.querySelector("#priority").value;

    const currentTask = {
        title: title,
        category: category,
        date: date,
        status: "Pending",
        priority: priority
    }

    if(editIndex===null){
        task.push(currentTask);
    }else{
        task[editIndex].title=currentTask.title;
        task[editIndex].category=currentTask.category;
        task[editIndex].date=currentTask.date;
        task[editIndex].status=currentTask.status;
        task[editIndex].priority=currentTask.priority;
    }
    editIndex=null;
    console.log(task);

    form.reset();
    RenderTask();
})


function saveData() {
    localStorage.setItem('task', JSON.stringify(task));
}

function RenderTask() {
    TaskContainer.innerHTML = "";

    const filteredTask= currentCategory === "all" ? task : task.filter(item => item.category === currentCategory);

    filteredTask.forEach((item, index) => {

        Task=document.querySelectorAll('.task');

        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.setAttribute("data-index", index);
        taskDiv.innerHTML = `
        
        <div class="top">
        <div class="data-info">
        <span class="data-category">${item.category}</span>
        <span class="status data-status-${item.status.toLowerCase()}">${item.status}</span>
        <span class="priority data-priority-${item.priority.toLowerCase()}">${item.priority}</span>
        </div>

        <div class="mark-as-done ${item.status.toLowerCase()}">
            <i class="ri-check-line"></i>
        </div >
        </div>  

<div class="data-title">${item.title}</div>
        
 <div class="bottom">
    <div class="date">
         <div class="date">📅 ${item.date}</div>
    </div>
    <div class="modify">
        <i class="ri-edit-2-line"></i>
        <i class="ri-delete-bin-6-line"></i>
    </div>
</div>
`;
       
        TaskContainer.appendChild(taskDiv);
    });

    saveData();

}


TaskContainer.addEventListener("click", function (e) {
   const index = e.target.closest('.task').getAttribute('data-index');
    console.log(index);

    console.log(e.target)

    if (e.target.classList.contains('ri-check-line')) {
        let markasdone = document.querySelector('.mark-as-done');
        if(task[index].status=='Pending'){
            task[index].status='completed';
        }else{
            task[index].status='Pending';  
        }
        RenderTask();
    }

    if(e.target.classList.contains('ri-delete-bin-6-line')){
        console.log(task[index]);
        task.splice(index,1);
        RenderTask();
    }

    if(e.target.classList.contains('ri-edit-2-line')){
            document.querySelector('.form-overlay').classList.add('active');

            form.querySelector('input').value = task[index].title;
            form.querySelector('#category').value = task[index].category;
            form.querySelector('#priority').value = task[index].priority;

            editIndex=index;

    }

})


RenderTask();


