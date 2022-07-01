import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { ITaskGroup } from "../../domain/task";
import TaskList from "./TaskList";

const TaskGroupHeader = ({ onClick, title = "" }) => {
    return (
        <Typography onClick={onClick} variant="h2" sx={{ mb: 2 }}>
            {title}
        </Typography>
    );
};

const TaskGroup = ({ id, title = "", taskLists = [] }: ITaskGroup) => {
    const [isGroupExpanded, setIsGroupExpanded] = useState(false);
    const toggleGroupExpansion = () => setIsGroupExpanded((previous) => !previous);

    return (
        <Box sx={{ border: "0.1px solid rgb(192 192 192 / 25%)", p: 1, mb: 3 }}>
            <TaskGroupHeader title={title} onClick={toggleGroupExpansion} />
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
