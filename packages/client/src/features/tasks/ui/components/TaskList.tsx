import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { TaskListDTO } from "../../services";
import styles from "./task-list.module.css";
import TaskGroup from "./TaskGroup";

const TaskListHeader = ({ onClick = () => {}, title = "", expanded = false }) => {
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
                {title}
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
)

const TaskList = ({ id, title = "", taskGroups = [] }: TaskListDTO) => {
    const [isListExpanded, setIsListExpanded] = useState(true);
    const toggleListExpansion = () => setIsListExpanded((previous) => !previous);

    return (
        <TaskListContainer>
            <TaskListHeader
                title={title}
                onClick={toggleListExpansion}
                expanded={isListExpanded}
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
