import Grid from "@mui/material/Grid";
import { useState } from "react";
import { TaskGroupDTO } from "../../services";
import Task from "./Task";
import styles from "./task-list.module.css";
import TaskGroupTitle from "./TaskGroupTitle";

const TaskGroupColumns = () => {
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

const TaskGroup = ({ status = "", tasks = [] }: TaskGroupDTO) => {
    const [isGroupExpanded, setIsGroupExpanded] = useState(true);
    const toggleGroupExpansion = () => setIsGroupExpanded((previous) => !previous);

    return (
        <div className={styles.listContainer}>
            <Grid container sx={{ alignItems: "center" }}>
                <Grid item xs={6}>
                    <TaskGroupTitle
                        title={status}
                        tasksCount={tasks.length}
                        toggleListExpansion={toggleGroupExpansion}
                        isListExpanded={isGroupExpanded}
                    />
                </Grid>

                {isGroupExpanded && <TaskGroupColumns />}
            </Grid>

            {isGroupExpanded && (
                <div className={styles.tasksContainer}>
                    {tasks.map((task) => (
                        <Task key={task.id} {...task} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskGroup;
