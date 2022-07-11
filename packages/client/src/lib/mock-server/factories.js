import { Factory } from "miragejs";

const getRandomElementFromArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};
export const factories = {
    group: Factory.extend({
        title: () => getRandomElementFromArray(["Frontend", "Backend", "DevOps", "Business"]),
    }),

    task: Factory.extend({
        title: () => getRandomElementFromArray(["Snow", "Hasan", "Hamsho", "Hisham"]),
        status: () => getRandomElementFromArray(["In progress", "Done", "TODO"]),
    }),
};
