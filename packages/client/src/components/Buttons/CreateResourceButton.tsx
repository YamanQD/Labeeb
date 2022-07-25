import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

const CreateResourceButton = styled(IconButton)(
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

export default CreateResourceButton;