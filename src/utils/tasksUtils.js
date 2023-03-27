import TASKS_ACTIVE_TYPES from "../constants/tasksActiveTypes";

const deleteTask = (id, tasksList) =>
  tasksList.filter((task) => task.id !== id);

const editTask = (id, updatedTask, tasksList) =>
  tasksList.map((task) => {
    if (task.id !== id) return task;

    return updatedTask;
  });

const getDoneTasksAmount = (tasksList) =>
  tasksList.reduce((amount, task) => (task.checked ? amount + 1 : amount), 0);

const getPercentOfDoneTasks = (tasksList, doneTasksAmount) =>
  (doneTasksAmount / tasksList.length || 0) * 100;

const filterTasksByValue = (tasksList, value) =>
  tasksList.filter((task) => task.text.search(value) !== -1);

const filterTasksByActiveType = (tasksList, activeType) => {
  switch (activeType) {
    case TASKS_ACTIVE_TYPES.ALL: 
      return tasksList;
    case TASKS_ACTIVE_TYPES.ACTIVE:
      return tasksList.filter(task => !task.checked);
    case TASKS_ACTIVE_TYPES.DONE:
      return tasksList.filter(task => task.checked);
    default: 
      return tasksList;
  }
}

const TaskUtils = {
  deleteTask,
  editTask,
  getDoneTasksAmount,
  getPercentOfDoneTasks,
  filterTasksByValue,
  filterTasksByActiveType,
};

export default TaskUtils;
