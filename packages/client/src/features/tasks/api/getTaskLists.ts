import { useQuery } from "react-query";
import { ITaskList } from "../types";

const mockTasksLists: ITaskList[] = [
    {
        id: 1,
        title: "Frontend",
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

export const useGetTaskLists = () => {
    const fetchTaskLists = async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const json = await response.json();

        const mappedData = json.map((post) => {
            return {
                id: post.id,
                title: "Backend",
                color: "#aaddee",
                tasks: [
                    {
                        id: post.id + Math.random(),
                        title: post.body.slice(0, 10)
                    },

                    {
                        id: post.id - Math.random(),
                        title: post.title
                    },

                    {
                        id: post.id + Math.random() * 2,
                        title: post.body.slice(0, 10)
                    }
                ]
            }
        });

        return mappedData.slice(0, 3);
    }

    return useQuery('taskLists', fetchTaskLists);
}