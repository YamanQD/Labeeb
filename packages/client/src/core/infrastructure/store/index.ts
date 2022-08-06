import create from "zustand";
import { IStore } from "../interfaces/IStore";

const getInitialUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const useStore = create<IStore>()((set, get) => ({
    currentProjectId: null,
    currentListId: null,
    currentTaskId: null,
    isTaskModalOpen: false,
    userProfile: getInitialUser(),

    toggleTaskModal(value) {
        set(() => ({
            isTaskModalOpen: value ? value : !get().isTaskModalOpen,
        }));
    },

    setUserProfile(user) {
        set(() => ({
            userProfile: user,
        }));

        if (user) localStorage.setItem("user", JSON.stringify(user));
        else localStorage.removeItem("user");
    },

    setCurrentTaskId(id) {
        set(() => ({
            currentTaskId: id,
        }));
    },
}));
