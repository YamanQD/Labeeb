import { useState } from "react";
import { useTranslation } from "react-i18next";

import Grid from "@mui/material/Grid";

import Task from "../Task";
import styles from "./task-group.module.css";
import TaskGroupTitle from "./TaskGroupTitle";
import { TaskGroupDTO } from "../../../application";

const TaskGroupColumns = () => {
    const { t } = useTranslation();
    return (
        <Grid item xs={6} className={styles.columnContainer}>
            <Grid container>
                <Grid item xs={4} className={styles.column}>
                    {t("tasks.tags")}
                </Grid>
                <Grid item xs={4} className={styles.column}>
                    {t("tasks.priority")}
                </Grid>
                <Grid item xs={4} className={styles.column}>
                    {t("tasks.deadline")}
                </Grid>
            </Grid>
        </Grid>
    );
};

const TaskGroup = ({ status, tasks = [] }: TaskGroupDTO) => {
    const [isGroupExpanded, setIsGroupExpanded] = useState(true);
    const toggleGroupExpansion = () => setIsGroupExpanded((previous) => !previous);

    return (
        <div className={styles.listContainer}>
            <Grid container sx={{ alignItems: "center" }}>
                <Grid item xs={6}>
                    <TaskGroupTitle
                        title={status.title}
                        color={status.color}
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
