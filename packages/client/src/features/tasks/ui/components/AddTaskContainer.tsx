import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { useCallback, useState } from "react";
import AddTaskModal from "./AddTaskModal";

const AddTaskButtonContainer = styled("div")`
    display: flex;
    position: fixed;

    bottom: 3%;
    right: 3%;
    align-items: center;
`;

const AddTaskButton = styled(IconButton)(
    ({ theme }) => `
    background-color: ${theme.palette.primary.light};
    color: ${theme.palette.primary.contrastText};
    margin-left: ${theme.spacing(1.5)};
    transition: background-color 0.1s ease-in;

    &:hover {
        background-color: ${theme.palette.primary.dark}
    }

    &:disabled {
        background-color: ${theme.palette.grey[500]};
        color: white;
    }
`
);

const AddTaskContainer = ({ disabled = false }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = useCallback(() => setIsModalOpen(true), []);
    const closeModal = useCallback(() => setIsModalOpen(false), []);

    return (
        <>
            <AddTaskButtonContainer>
                <AddTaskButton onClick={openModal} disabled={disabled}>
                    <AddIcon />
                </AddTaskButton>
            </AddTaskButtonContainer>
            <AddTaskModal open={isModalOpen} closeModal={closeModal} />
        </>
    );
};
export default AddTaskContainer;
