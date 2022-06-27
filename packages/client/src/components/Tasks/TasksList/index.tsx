import { ITasksList } from "src/models/task.model";
import Task from "../Task";
import styles from "./tasks-list.module.css";
import TasksListHeader from "./TasksListHeader";

const TasksList = ({ title = "", tasks = [], color }: ITasksList) => {
    return (
        <div className={styles.tasksListContainer}>
            <TasksListHeader title={title} color={color} tasksCount={tasks.length} />

            {tasks.map((task) => (
                <Task key={task.id} {...task} />
            ))}
        </div>
    );
};

export default TasksList;
