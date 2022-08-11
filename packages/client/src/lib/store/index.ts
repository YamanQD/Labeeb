import create from "zustand";
import { IStore } from "./IStore";

const getInitialUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const useStore = create<IStore>()((set, get) => ({
    currentProjectId: null,
    currentListId: null,
    currentTaskId: null,
    isTaskModalOpen: false,
    isMotivationModalOpen: false,
    userProfile: getInitialUser(),

    toggleTaskModal(value) {
        set(() => ({
            isTaskModalOpen: value ? value : !get().isTaskModalOpen,
        }));
    },

    toggleMotivationModal(value) {
        set(() => ({
            isMotivationModalOpen: value ? value : !get().isMotivationModalOpen,
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
