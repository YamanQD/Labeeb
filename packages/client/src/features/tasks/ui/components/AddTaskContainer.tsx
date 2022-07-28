import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { useCallback } from "react";
import { useStore } from "src/core/infrastructure/store";
import TaskModal from "./TaskModal";

const AddTaskContainer = ({ disabled = false }) => {
    const isModalOpen = useStore((state) => state.isTaskModalOpen);
    const toggleModal = useStore((state) => state.toggleTaskModal);
    const setCurrentTaskId = useStore((state) => state.setCurrentTaskId);

    const openModal = useCallback(() => toggleModal(true), [toggleModal]);
    const closeModal = useCallback(() => {
        toggleModal(false);
        setCurrentTaskId(null);
    }, [toggleModal, setCurrentTaskId]);

    return (
        <>
            <Fab
                color="primary"
                size="medium"
                onClick={openModal}
                disabled={disabled}
                sx={{ position: "fixed", bottom: "5%", right: "3%" }}
            >
                <AddIcon />
            </Fab>
            <TaskModal open={isModalOpen} closeModal={closeModal} />
        </>
    );
};
export default AddTaskContainer;
