import Box from "@mui/material/Box";
import SuspenseLoader from "src/components/SuspenseLoader";
import { useStore } from "src/core/infrastructure/store";
import { useGetTaskGroups } from "../../application/getTaskGroups";
import AddTaskContainer from "../components/AddTaskContainer";
import TaskGroup from "../components/TaskGroup";

const Tasks = () => {
    const currentProjectId = useStore((state) => state.currentProjectId);
    const currentGroupId = useStore((state) => state.currentGroupId);
    
    const isQueryEnabled = !!currentProjectId;

    const {
        data: taskGroups,
        isLoading,
        isError,
    } = useGetTaskGroups({
        projectId: currentProjectId,
        groupId: currentGroupId,
        queryOptions: {
            enabled: isQueryEnabled,
        },
    });

    let content;

    if (isLoading) content = <SuspenseLoader />;
    else if (isError)
        content = <p>An error occurred while fetching data. Please refresh your browser.</p>;
    else if (!isQueryEnabled) content = <p>Please select a project from the sidebar.</p>;
    else
        content = (
            <Box sx={{ p: 4 }}>
                <>
                    {taskGroups?.map((group) => (
                        // Task groups contain task lists (open tasks, WIP tasks, .etc)
                        // And task lists are composed of individual tasks
                        <TaskGroup key={group.id} {...group} />
                    ))}
                </>
            </Box>
        );

    return (
        <div>
            {content}
            <AddTaskContainer disabled={isLoading || !isQueryEnabled} />
        </div>
    );
};

export default Tasks;
