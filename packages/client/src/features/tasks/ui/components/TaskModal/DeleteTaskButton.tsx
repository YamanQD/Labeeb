import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ConfirmationButtonsContainer = styled("div")(
    ({ theme }) => `
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    margin-top: 3rem;
    `
);

const ModalBody = styled("div")(
    ({ theme }) => `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 400px;
    background-color: ${theme.palette.background.paper};
    border: 1px solid silver;
    border-radius: 5px;
    box-shadow: ${theme.shadows[2]};
    padding: ${theme.spacing(3, 4)};
    `
);

const DeleteTaskButton = ({ onConfirmation = () => {} }) => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen((open) => !open);

    const onYes = () => {
        toggleModal();
        onConfirmation();
    };

    return (
        <>
            <IconButton color="error" onClick={toggleModal} title={t("tasks.delete_task")}>
                <DeleteIcon />
            </IconButton>
            <Modal
                open={isModalOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ModalBody>
                    <h3>Are you sure you want to do this?</h3>
                    <ConfirmationButtonsContainer>
                        <Button onClick={onYes} variant="contained">
                            Yes
                        </Button>
                        <Button onClick={toggleModal} color="error" variant="contained">
                            Cancel
                        </Button>
                    </ConfirmationButtonsContainer>
                </ModalBody>
            </Modal>
        </>
    );
};
export default DeleteTaskButton;
