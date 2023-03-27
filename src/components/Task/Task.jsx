import { useState } from "react";
import styles from "./styles.module.scss";

const Task = ({
  task,
  onDeleteTask,
  onEditTask,
  onChangeTaskText,
  onChangeTaskChecked,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const onKeyDownTaskText = (e) => {
    if (e.code !== "Enter") return;
    setIsEditing(false);
  };

  return (
    <li className={styles.task}>
      <input
        onChange={() => onChangeTaskChecked(task)}
        value={task.checked}
        type="checkbox"
      />
      {isEditing ? (
        <input
          onKeyDown={onKeyDownTaskText}
          onChange={(e) => onChangeTaskText(e.target.value, task)}
          type="text"
          value={task.text}
        />
      ) : (
        <p
            style={{
            textDecoration: task.checked ? "line-through" : "none",
            marginLeft: "10px",
            fontFamily: "Georgia, serif",
          }}
        >
          {task.text}
        </p>
      )}
      {!isEditing && <button className={ styles.editButton } onClick={() => setIsEditing(true)}>edit</button>}
      <button className={ styles.deleteButton } onClick={() => onDeleteTask(task.id)}>X</button>
    </li>
  );
};

export default Task;
