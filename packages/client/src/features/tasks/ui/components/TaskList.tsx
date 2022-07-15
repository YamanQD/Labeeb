import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useMemo, useState } from "react";
import { TaskGroupDTO, TaskListDTO } from "../../services";
import styles from "./TaskGroup/task-group.module.css";
import TaskGroup from "./TaskGroup";

const getTasksCountForList = (listTaskGroups: TaskGroupDTO[]) => {
    return listTaskGroups.reduce((previousTasksCount, newGroup) => {
        return previousTasksCount + newGroup.tasks.length;
    }, 0);
};

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
                {title} - {tasksCount}
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

const TaskList = ({ id, title = "", taskGroups = [] }: TaskListDTO) => {
    const [isListExpanded, setIsListExpanded] = useState(true);
    const toggleListExpansion = () => setIsListExpanded((previous) => !previous);

    const tasksCount = useMemo<number>(() => getTasksCountForList(taskGroups), [taskGroups]);

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
