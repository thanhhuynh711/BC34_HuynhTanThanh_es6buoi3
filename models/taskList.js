export default class TaskList {
  constructor() {
    this.listTask = [];
  }

  findIndex(id) {
    {
      return this.listTask.findIndex((tdo) => tdo.id === id);
    }
  }

  add(todoin) {
    this.listTask.push({ ...todoin, id: "", type: "incomplete" });
  }

  delete(id) {
    this.listTask.filter((item) => item.id !== id);
  }
}
