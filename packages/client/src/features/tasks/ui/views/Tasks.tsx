import { Box } from "@mui/material";
import { useGetAllTaskGroupsForProject } from "../../application/getAllTaskGroupsForProject";
import TaskGroup from "../components/TaskGroup";

const Tasks = () => {
    const { data: taskGroups, isLoading } = useGetAllTaskGroupsForProject(1);

    return (
        <Box sx={{ p: 4 }}>
            {isLoading ? (
                "LOADING MAN PLEASE WAIT"
            ) : (
                <>
                    {taskGroups.map((group) => (
                        // Task groups contain task lists (open tasks, WIP tasks, .etc)
                        // And task lists are composed of individual tasks
                        <TaskGroup key={group.id} {...group} />
                    ))}
                </>
            )}
        </Box>
    );
};

export default Tasks;
