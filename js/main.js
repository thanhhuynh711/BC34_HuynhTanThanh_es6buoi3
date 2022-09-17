import ServiceAPI from "../service/service.js";
import Task from "../models/task.js";
import TaskList from "../models/taskList.js";

let listTask = [];

let listTasks = new TaskList();

document.getElementById("addItem").onclick = () => {
  let NewTask = document.getElementById("newTask").value;
  let todoI = new Task("", NewTask, "incomplete");
  listTask = [...listTask, todoI];
  postData(todoI);
  renderTasklist(listTask);
};

document.getElementById("two").onclick = () => {
  let arrSort = listTask.sort((tdoA, tdoB) => {
    let a = tdoA.content.toLowerCase();
    let b = tdoB.content.toLowerCase();
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });
  renderTasklist(arrSort);
};
document.getElementById("three").onclick = () => {
  let arrSort = listTask.sort((tdoA, tdoB) => {
    let a = tdoA.content.toLowerCase();
    let b = tdoB.content.toLowerCase();
    if (a > b) {
      return -1;
    }
    if (a < b) {
      return 1;
    }
    return 0;
  });
  renderTasklist(arrSort);
};

const postData = async (tdo) => {
  try {
    const postTdo = await ServiceAPI.postTask(tdo);
  } catch (error) {
    throw error;
  }
};

window.removeTodo = (id) => {
  deleteData(id);
};

window.doneTodo = (id) => {
  for (let i = 0; i < listTask.length; i++) {
    if (listTask[i].id * 1 === id) {
      listTask[i] = { ...listTask[i], type: "complete" };
      updateData(listTask[i]);
    }
  }

  renderTasklist(listTask);
};

const updateData = async (tdo) => {
  const upData = await ServiceAPI.updateTask(tdo).then((res) => {
    console.log(res);
  });
};

const deleteData = async (id) => {
  const deleteTdo = await ServiceAPI.deleteTask(id).then((res) => {
    listTask = listTask.filter((item) => item.id !== `${id}`);
    renderTasklist(listTask);
  });
};

const renderTasklist = (list) => {
  let contentA = "";
  let contentB = "";
  for (let i = 0; i < list.length; i++) {
    let type = list[i].type;
    if (type == "incomplete") {
      contentA += `
      <li>${list[i].content}
      <div class="buttons">
      <button onclick='doneTodo(${list[i].id})'>
      <i class="fa fa-check-circle"></i>
      </button>
      <button onclick='removeTodo(${list[i].id})'>
      <i class="fa-regular fa-trash-can"></i>
      </button>
      </div>
      </li>
      `;
    } else if (type == "complete") {
      contentB += `
      <li style="color:green">${list[i].content}
      <div class="buttons">
      <button>
      <i style="color:green" class="fa fa-check-circle"></i>
      </button>
      <button onclick='removeTodo(${list[i].id})'>
      <i class="fa-regular fa-trash-can"></i>
      </button>
      </div>
      </li>
      `;
    }
  }
  document.getElementById("todo").innerHTML = contentA;
  document.getElementById("completed").innerHTML = contentB;
};
const fetchData = async () => {
  try {
    const { data } = await ServiceAPI.getTask();
    if (data) {
      const list = data.map((tdo) => {
        const { id, content, type } = tdo;
        return new Task(id, content, type);
      });
      listTask = [...list];
      renderTasklist(listTask);
    }
  } catch (error) {
    throw error;
  }
};

fetchData();
