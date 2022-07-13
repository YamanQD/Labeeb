import { Factory } from "miragejs";
import { getRandomElementFromArray } from "./utils";

const getRandomStatusArray = () => {
    const statusArrays = [
        [
            {
                id: 1,
                label: "TODO"
            },

            {
                id: 2,
                label: "In Progress"
            },

            {
                id: 3,
                label: "Done"
            },
        ],

        [
            {
                id: 4,
                label: "Uncategorized"
            },

            {
                id: 5,
                label: "Done"
            },

            {
                id: 6,
                label: "WONTFIX"
            }
        ]
    ];

    return getRandomElementFromArray(statusArrays);
}

export const factories = {
    project: Factory.extend({
        statuses: getRandomStatusArray()
    }),

    group: Factory.extend({
        title: () => getRandomElementFromArray(["Frontend", "Backend", "DevOps", "Business"]),
    }),

    task: Factory.extend({
        title: () => getRandomElementFromArray(["Snow", "Hasan", "Hamsho", "Hisham"]),
        priority: () => getRandomElementFromArray(["none", "low", "medium", "high"])
    }),
};
