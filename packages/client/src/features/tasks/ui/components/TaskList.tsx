import Grid from "@mui/material/Grid";
import { useState } from "react";
import { TaskListDTO } from "../../services";
import Task from "./Task";
import styles from "./task-list.module.css";
import TaskListTitle from "./TaskListTitle";

const TaskListColumns = () => {
    return (
        <Grid item xs={6} className={styles.columnContainer}>
            <Grid container>
                <Grid item xs={4} className={styles.column}>
                    Assignee
                </Grid>
                <Grid item xs={4} className={styles.column}>
                    Priority
                </Grid>
                <Grid item xs={4} className={styles.column}>
                    Deadline
                </Grid>
            </Grid>
        </Grid>
    );
};

const TaskList = ({ status = "", tasks = [] }: TaskListDTO) => {
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
                <div className={styles.tasksContainer}>
                    {tasks.map((task) => (
                        <Task key={task.id} {...task} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
