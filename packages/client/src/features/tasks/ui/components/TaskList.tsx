import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { TaskListDTO } from "../../application";
import TaskGroup from "./TaskGroup";
import styles from "./TaskGroup/task-group.module.css";

const TaskListHeader = ({ onClick = () => {}, title = "", expanded = false, tasksCount = 0 }) => {
    return (
        <div
            className={styles.listTitleContainer}
            onClick={onClick}
            style={{ marginBottom: "1rem" }}
        >
            <div
                className={styles.arrowIcon}
                style={{ transform: expanded ? "" : "rotate(-90deg)" }}
            >
                <KeyboardArrowDownSharpIcon color="action" />
            </div>

            <Typography variant="h2" sx={{ ml: 0.2 }}>
                {title} - {tasksCount > 0 ? tasksCount : "There are no tasks for this list."}
            </Typography>
        </div>
    );
};

const TaskListContainer = styled("div")(
    ({ theme }) => `
    border: 0.1px solid rgb(192 192 192 / 25%);
    padding: ${theme.spacing(2)};
    margin-bottom: ${theme.spacing(3)};
    `
);

const TaskList = ({ title = "", taskGroups = [], tasksCount = 0 }: TaskListDTO) => {
    const [isListExpanded, setIsListExpanded] = useState(true);
    const toggleListExpansion = () => setIsListExpanded((previous) => !previous);

    return (
        <TaskListContainer>
            <TaskListHeader
                title={title}
                onClick={toggleListExpansion}
                expanded={isListExpanded}
                tasksCount={tasksCount}
            />
            {isListExpanded && (
                <>
                    {taskGroups.map((group) => (
                        <TaskGroup key={group.id} {...group} />
                    ))}
                </>
            )}
        </TaskListContainer>
    );
};
export default TaskList;
