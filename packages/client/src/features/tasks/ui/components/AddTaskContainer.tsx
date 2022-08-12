import { useCallback } from "react";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

import { useStore } from "src/lib/store";

import TaskModal from "./TaskModal";
import { useTranslation } from "react-i18next";

const AddTaskContainer = ({ disabled = false }) => {
    const { t } = useTranslation();
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
                title={t("tasks.create_task")}
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
