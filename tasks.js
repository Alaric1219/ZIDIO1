document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    const taskProgress = document.getElementById("taskProgress");
    const progressText = document.getElementById("progressText");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        taskList.innerHTML = "";
        let completedTasks = 0;

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${task.title} - 
                <select class="statusSelect" data-index="${index}">
                    <option value="To-Do" ${task.status === "To-Do" ? "selected" : ""}>To-Do</option>
                    <option value="In Progress" ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
                    <option value="Completed" ${task.status === "Completed" ? "selected" : ""}>Completed</option>
                </select>
                <button class="deleteTask" data-index="${index}">Delete</button>
            `;

            if (task.status === "Completed") completedTasks++;
            taskList.appendChild(li);
        });

        updateProgress(completedTasks);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function updateProgress(completedTasks) {
        let totalTasks = tasks.length;
        let progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

        taskProgress.value = progress;
        progressText.textContent = `${Math.round(progress)}% Completed`;
    }

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const title = document.getElementById("taskTitle").value;
        const status = document.getElementById("taskStatus").value;

        tasks.push({ title, status });
        renderTasks();
        taskForm.reset();
    });

    taskList.addEventListener("change", function (event) {
        if (event.target.classList.contains("statusSelect")) {
            const index = event.target.dataset.index;
            tasks[index].status = event.target.value;
            renderTasks();
        }
    });

    taskList.addEventListener("click", function (event) {
        if (event.target.classList.contains("deleteTask")) {
            const index = event.target.dataset.index;
            tasks.splice(index, 1);
            renderTasks();
        }
    });

    renderTasks();
});
