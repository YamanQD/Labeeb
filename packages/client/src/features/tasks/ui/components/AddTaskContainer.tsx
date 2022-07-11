import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";

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
    &:hover {
        background-color: ${theme.palette.primary.dark}
    }
`
);

const AddTaskContainer = ({ onClick = () => {} }) => {
    return (
        <AddTaskButtonContainer>
            <AddTaskButton onClick={onClick}>
                <AddIcon />
            </AddTaskButton>
        </AddTaskButtonContainer>
    );
};
export default AddTaskContainer;
