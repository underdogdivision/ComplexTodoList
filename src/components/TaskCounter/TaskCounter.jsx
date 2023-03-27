import TaskUtils from "../../utils/tasksUtils";
import styles from './styles.module.scss';

const TaskCounter = ({ tasksList }) => {
  const tasksAmount = tasksList.length;
  const doneTasksAmount = TaskUtils.getDoneTasksAmount(tasksList);
  const doneTasksPercent = TaskUtils.getPercentOfDoneTasks(
    tasksList,
    doneTasksAmount
  );

  return (
    <div className={styles.taskCounter}>
      {doneTasksAmount}/{tasksAmount}
      <span style={{
        width: `${doneTasksPercent}%`
      }} className={styles.bg}></span>
    </div>
  );
};

export default TaskCounter;
