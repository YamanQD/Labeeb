import create from "zustand";
import { IStore } from "../interfaces/IStore";

const getInitialUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const useStore = create<IStore>()((set, get) => ({
    currentProjectId: null,
    currentListId: null,
    isTaskModalOpen: false,
    currentTaskInfo: null,
    user: getInitialUser(),

    setTaskListToView({ projectId, listId }) {
        set(() => ({
            currentListId: listId,
            currentProjectId: projectId,
        }));
    },

    toggleTaskModal(value) {
        set(() => ({
            isTaskModalOpen: value ? value : !get().isTaskModalOpen,
        }));
    },

    setCurrentTaskInfo(task) {
        set(() => ({
            currentTaskInfo: task,
        }));
    },

    setUserInfo(user) {
        set(() => ({
            user,
        }));

        if (user) localStorage.setItem("user", JSON.stringify(user));
        else localStorage.removeItem("user");
    },
}));
