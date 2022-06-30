import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./task-list.module.css";

const TaskListTitle = ({
    title = "",
    tasksCount = 0,
    isListExpanded = true,
    toggleListExpansion = () => {},
}) => {
    return (
        <div className={styles.listTitleContainer} onClick={toggleListExpansion}>
            <Box
                className={styles.listTitleIcon}
                style={{
                    transform: isListExpanded ? "" : "rotate(-90deg)",
                }}
            >
                <KeyboardArrowDownSharpIcon color="primary" />
            </Box>
            <Button
                variant="contained"
                color="primary"
                disableElevation
                sx={{
                    ml: "5px",
                    px: 1,
                    textTransform: "none"
                }}
            >
                <Typography variant="h4">
                    {title}
                </Typography>
                <span style={{margin: "0 5px"}}>-</span>
                <Typography variant="h4" component="span">
                   {tasksCount} Tasks
                </Typography>
            </Button>
        </div>
    );
};

export default TaskListTitle;
