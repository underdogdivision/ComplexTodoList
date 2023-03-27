import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./styles.module.scss";
import { Task, TaskCounter } from "../index";
import { ACTIVE_TABS_DATA } from "./constants";
import TaskUtils from "../../utils/tasksUtils";

const Todo = () => {
  const [addValue, setAddValue] = useState("");
  const [tasksList, setTasksList] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [activeType, setActiveType] = useState(null);

  const filterCallbacks = [
    (tasksList) => TaskUtils.filterTasksByValue(tasksList, searchVal),
    (tasksList) => TaskUtils.filterTasksByActiveType(tasksList, activeType),
  ];

  const filteredTasksList = filterCallbacks.reduce((tasksList, callback) => {
    return callback(tasksList);
  }, tasksList);

  const onAddTask = () => {
    if (!addValue) return;

    setTasksList([
      ...tasksList,
      {
        id: uuidv4(),
        text: addValue,
        checked: false,
      },
    ]);
    setAddValue("");
  };

  const onChangeAddValue = (e) => {
    setAddValue(e.target.value);
  };

  const onDeleteTask = (id) =>
    setTasksList(TaskUtils.deleteTask(id, tasksList));

  const onEditTask = (id, updatedTask) =>
    setTasksList(TaskUtils.editTask(id, updatedTask, tasksList));

  const onChangeTaskText = (val, task) => {
    onEditTask(task.id, {
      ...task,
      text: val,
    });
  };

  const onChangeTaskChecked = (task) => {
    onEditTask(task.id, {
      ...task,
      checked: !task.checked,
    });
  };

  const onClearTasks = () => {
    setTasksList([]);
  };

  return (
    <div className={styles.todo}>
      <div className={styles.searchContainer}>
        <input
          onChange={onChangeAddValue}
          value={addValue}
          className={styles.searchInput}
          placeholder="Input some task"
          type="text"
        />
        <button onClick={onAddTask} className={styles.addButton}>
          Add
        </button>
      </div>
      <input
        onChange={(e) => setSearchVal(e.target.value)}
        value={searchVal}
        placeholder="Find task"
        type="text"
      />
      <div>
        {ACTIVE_TABS_DATA.map((tab) => (
          <button
            style={{
              border: tab.type === activeType ? "1px solid red" : "none",
              fontSize: "15px",
              marginRight: "10px",
              marginTop: "5px",
            }}
            onClick={() => setActiveType(tab.type)}
            key={tab.text}
          >
            {tab.text}
          </button>
        ))}
      </div>
      <div>
        <ul>
          {filteredTasksList.map((task) => (
            <Task
              key={task.id}
              task={task}
              onDeleteTask={onDeleteTask}
              onChangeTaskChecked={onChangeTaskChecked}
              onChangeTaskText={onChangeTaskText}
            />
          ))}
        </ul>
      </div>
      <TaskCounter tasksList={tasksList} />
      <button className={styles.clearButton} onClick={onClearTasks}>
        Clear
      </button>
    </div>
  );
};

export default Todo;
