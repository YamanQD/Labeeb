import { Priority } from "@labeeb/core";
import { getDeadlineStatus } from "./index";

export const getDeadlineStyles = (deadline?: Date): Record<string, string> => {
    const deadlineStatus = getDeadlineStatus(deadline);

    let styles = {};

    switch (deadlineStatus) {
        case "passed":
            styles = {
                color: "#ff0000",
                fontWeight: "bold",
            };
            break;
        case "close":
            styles = {
                color: "orange",
                fontWeight: "bold",
            };
            break;
        case "far":
            styles = {
                color: "text.primary",
            };
            break;
    }

    return styles;
};

export const getPriorityStyles = (priority: Priority): Record<string, string> => {
    let styles = {};

    switch (priority) {
        case Priority.NONE:
            styles = {
                color: "#dadada",
            };
            break;
        case Priority.LOW:
            styles = {
                color: "#00fc08",
            };
            break;
        case Priority.MEDIUM:
            styles = {
                color: "#ffa600",
            };
            break;

        case Priority.HIGH:
            styles = {
                color: "#ff0000",
                fontWeight: "bold"
            };
            break;
    }

    return styles;
}