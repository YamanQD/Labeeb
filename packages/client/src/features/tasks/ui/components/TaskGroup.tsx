import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { ITaskGroup } from "../../domain/task";
import styles from "./task-list.module.css";
import TaskList from "./TaskList";

const TaskGroupHeader = ({ onClick = () => {}, title = "", expanded = false }) => {
    return (
        <div className={styles.listTitleContainer} onClick={onClick} style={{marginBottom: "1rem"}}>
            <div className={styles.arrowIcon} style={{transform: expanded ? "" : "rotate(-90deg)"}}>
                <KeyboardArrowDownSharpIcon color="action" />
            </div>
            <Typography variant="h2" sx={{ml: 0.2}}>
                {title}
            </Typography>
        </div>
    );
};

const TaskGroup = ({ id, title = "", taskLists = [] }: ITaskGroup) => {
    const [isGroupExpanded, setIsGroupExpanded] = useState(true);
    const toggleGroupExpansion = () => setIsGroupExpanded((previous) => !previous);

    return (
        <Box sx={{ border: "0.1px solid rgb(192 192 192 / 25%)", p: 2, mb: 3 }}>
            <TaskGroupHeader title={title} onClick={toggleGroupExpansion} expanded={isGroupExpanded} />
            {isGroupExpanded && (
                <>
                    {taskLists.map((list) => (
                        <TaskList key={list.id} {...list} />
                    ))}
                </>
            )}
        </Box>
    );
};
export default TaskGroup;
