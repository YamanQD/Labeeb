import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styles from "./tasks-list.module.css";

const TasksListColumns = () => {
    return (
        <>
            <Grid item xs={2} className={styles.taskColumn}>
                Assignee
            </Grid>
            <Grid item xs={2} className={styles.taskColumn}>
                Priority
            </Grid>
            <Grid item xs={2} className={styles.taskColumn}>
                Deadline
            </Grid>
        </>
    );
};

const TasksListTitle = ({ title = "", color = "", tasksCount = 0 }) => {
    return (
        <div className={styles.listTitleContainer}>
            <Box
                className={styles.listTitleIcon}
                sx={{
                    border: `1px solid ${color}`,
                    "&:hover": {
                        backgroundColor: color,
                        "& svg": {
                            fill: "white",
                        },
                    },
                }}
            >
                <KeyboardArrowDownSharpIcon htmlColor={color} />
            </Box>
            <Typography
                variant="h4"
                className={styles.listTitle}
                sx={{
                    backgroundColor: color,
                    ml: "5px",
                    mb: "5px"
                }}
            >
                {title} -{" "}
                <Typography variant="h4" component="span">
                    {tasksCount} Tasks
                </Typography>
            </Typography>
        </div>
    );
};

const TasksListHeader = ({ title = "", color = "", tasksCount = 0 }) => {
    return (
        <Grid container sx={{ alignItems: "center" }}>
            <Grid item xs={6}>
                <TasksListTitle title={title} color={color} tasksCount={tasksCount} />
            </Grid>

            <TasksListColumns />
        </Grid>
    );
};

export default TasksListHeader;
