const todoForm = document.getElementById("todo-form");
const taskList = document.getElementById("tasks-list");
const input = todoForm.querySelector("input");
const totalTasksLabel = document.querySelector(".footer-section .tasks span");

let count = 0;
let editingItemIndex = 0;
let isEditing = false;

todoForm.addEventListener("submit", (_form) => {
  _form.preventDefault();

  const task = input.value;
  count++;
  if (isEditing) {
    const allItem = taskList.querySelectorAll(".item-box");
    allItem[editingItemIndex].querySelector("p").innerText = task;
    todoForm.classList.remove("isEditing");
    isEditing = false;
  } else {
    const newTask = `<div class="item-box">
      <strong>${count}</strong>
      <p>${task}</p>
      <div class="options">
        <div class="option edit-button">
          <i class="fas fa-pen"></i>
        </div>

        <div class="option delete-button">
          <i class="fa-solid fa-trash"></i>
        </div>
      </div>
    </div>`;
    taskList.innerHTML += newTask;
    addCrudOption();
    totalTasksLabel.innerText = count;
  }

  input.value = "";
});

function addCrudOption() {
  const taskItems = taskList.querySelectorAll(".item-box");
  taskItems.forEach((task, index) => {
    const editButton = task.querySelector(".options .option.edit-button");

    editButton.addEventListener("click", () => {
      editingItemIndex = index;
      isEditing = true;
      input.value = task.querySelector("p").innerText;
      input.focus();
      todoForm.classList.add("isEditing");
    });

    const deleteButton = task.querySelector(".options .option.delete-button");
    deleteButton.addEventListener("click", () => {
      taskItems[index].remove();

      const upDatedTask = taskList.querySelectorAll(".item-box");

      upDatedTask.forEach((_task, _index) => {
        _task.querySelector("strong").innerText = _index + 1;
        count = _index + 1;
        // updateTotalTasksLabel();
        totalTasksLabel.innerText = count;
      });
    });
  });
}

// function updateTotalTasksLabel() {
//   totalTasksLabel.innerText = count;
// }
