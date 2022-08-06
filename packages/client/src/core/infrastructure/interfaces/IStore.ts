import { UserProfileDTO } from "src/features/users/services/dto";

export interface IStore {
    isTaskModalOpen: boolean;
    toggleTaskModal: (value?: boolean) => void;

    /**
     * The ID of task that the user is currently viewing/editing/deleting.
     */
    currentTaskId: number | null;
    setCurrentTaskId: (id: number | null) => void;

    userProfile: UserProfileDTO | null;
    setUserProfile: (info: UserProfileDTO | null) => void;
}
