import Grid from "@mui/material/Grid";
import { useState } from "react";
import Task from "./Task";
import styles from "./task-list.module.css";
import TaskListTitle from "./TaskListTitle";
import { ITaskList } from "../../domain/task";

const TaskListColumns = () => {
    return (
        <>
            <Grid item xs={2} className={styles.taskColumn}>
                Assignee
            </Grid>
            <Grid item xs={2} className={styles.taskColumn}>
                Priority
            </Grid>
            <Grid item xs={2} className={styles.taskColumn}>
                Deadline
            </Grid>
        </>
    );
};

const TaskList = ({ status = "", tasks = [] }: ITaskList) => {
    const [isListExpanded, setIsListExpanded] = useState(true);
    const toggleListExpansion = () => setIsListExpanded((previous) => !previous);

    return (
        <div className={styles.listContainer}>
            <Grid container sx={{ alignItems: "center" }}>
                <Grid item xs={6}>
                    <TaskListTitle
                        title={status}
                        tasksCount={tasks.length}
                        toggleListExpansion={toggleListExpansion}
                        isListExpanded={isListExpanded}
                    />
                </Grid>

                {isListExpanded && <TaskListColumns />}
            </Grid>

            {isListExpanded && (
                <>
                    {tasks.map((task) => (
                        <Task key={task.id} {...task} />
                    ))}
                </>
            )}
        </div>
    );
};

export default TaskList;
