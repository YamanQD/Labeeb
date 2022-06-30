import { Box } from "@mui/material";
import TasksList from "../components/TasksList";
import { ITasksList } from "src/models/task.model";
import { useReducer } from "react";

// TODO: This state should be managed using a library
const taskLists: ITasksList[] = [
    {
        id: 1,
        title: "Frontend",
        color: "#72ebc2",
        tasks: [
            {
                id: 1,
                title: "Create application",
            },

            {
                id: 2,

                title: "Work",
            },

            {
                id: 13,
                title: "Go to lobby",
            },
        ],
    },

    {
        id: 2,
        title: "Backend",
        color: "#d7d8e7",
        tasks: [
            {
                id: 1,
                title: "Snow",
            },

            {
                id: 2,
                title: "Yaman",
            },

            {
                id: 13,
                title: "Malki",
            },
        ],
    },
];

const Tasks = () => {
    return (
        <Box sx={{ p: 4 }}>
            {taskLists.map((list) => (
                <TasksList key={list.id} {...list} />
            ))}
        </Box>
    );
};

export default Tasks;
