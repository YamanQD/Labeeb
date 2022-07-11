import Box from "@mui/material/Box";
import { useCallback, useState } from "react";
import SuspenseLoader from "src/components/SuspenseLoader";
import { useStore } from "src/core/infrastructure/store";
import { useGetTaskGroups } from "../../application/getTaskGroups";
import AddTaskContainer from "../components/AddTaskContainer";
import AddTaskModal from "../components/AddTaskModal";
import TaskGroup from "../components/TaskGroup";

const Tasks = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = useCallback(() => setIsModalOpen(true), []);
    const closeModal = useCallback(() => setIsModalOpen(false), []);

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

    if (isLoading) return <SuspenseLoader />;
    if (isError) return <p>An error occurred while fetching data. Please refresh your browser.</p>;
    if (!isQueryEnabled) return <p>Please select a project from the sidebar.</p>;

    return (
        <div>
            <Box sx={{ p: 4 }}>
                <>
                    {taskGroups?.map((group) => (
                        // Task groups contain task lists (open tasks, WIP tasks, .etc)
                        // And task lists are composed of individual tasks
                        <TaskGroup key={group.id} {...group} />
                    ))}
                </>
            </Box>

            <AddTaskContainer onClick={openModal} />
            <AddTaskModal open={isModalOpen} closeModal={closeModal} />
        </div>
    );
};

export default Tasks;
