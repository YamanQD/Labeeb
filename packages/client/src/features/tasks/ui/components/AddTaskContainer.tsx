import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import { useCallback } from "react";
import CreateResourceButton from "src/components/Buttons/CreateResourceButton";
import { useStore } from "src/core/infrastructure/store";
import TaskModal from "./TaskModal";

const AddTaskButtonContainer = styled("div")`
    display: flex;
    position: fixed;

    bottom: 3%;
    right: 3%;
    align-items: center;
`;


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
            <AddTaskButtonContainer>
                <CreateResourceButton onClick={openModal} disabled={disabled}>
                    <AddIcon />
                </CreateResourceButton>
            </AddTaskButtonContainer>
            <TaskModal open={isModalOpen} closeModal={closeModal} />
        </>
    );
};
export default AddTaskContainer;
