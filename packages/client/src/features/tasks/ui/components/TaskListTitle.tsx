import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styles from "./task-list.module.css";

const TitleButton = styled(Button)(
    ({ theme }) => `
    margin-left: 5px;
    padding: 0 ${theme.spacing(1)}px;
    text-transform: uppercase;
`
);

const TaskListTitle = ({
    title = "",
    tasksCount = 0,
    isListExpanded = true,
    toggleListExpansion = () => {},
}) => {
    return (
        <div className={styles.listTitleContainer} onClick={toggleListExpansion}>
            <div
                className={styles.arrowIcon}
                style={{
                    transform: isListExpanded ? "" : "rotate(-90deg)",
                }}
            >
                <KeyboardArrowDownSharpIcon color="secondary" />
            </div>

            <TitleButton variant="contained" color="secondary" disableElevation>
                <Typography variant="h4">{title}</Typography>
                <span style={{ margin: "0 5px" }}>-</span>
                <Typography variant="h4" component="span">
                    {tasksCount} Tasks
                </Typography>
            </TitleButton>
        </div>
    );
};

export default TaskListTitle;
