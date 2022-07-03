import { Box } from "@mui/material";
import { useStore } from "src/core/infrastructure/store";
import { useGetTaskGroups } from "../../application/getTaskGroups";
import TaskGroup from "../components/TaskGroup";

const Tasks = () => {
    const currentProjectId = useStore((state) => state.currentProjectId);
    const currentGroupId = useStore((state) => state.currentGroupId);

    const { data: taskGroups, isLoading } = useGetTaskGroups({
        projectId: currentProjectId,
        groupId: currentGroupId,
    });

    return (
        <Box sx={{ p: 4 }}>
            {isLoading ? (
                "LOADING MAN PLEASE WAIT"
            ) : (
                <>
                    {taskGroups?.map((group) => (
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
