import { useMutation } from "react-query";

import { APIError } from "src/lib/http/IhttpClient";
import { useStore } from "src/lib/store";

import { userService } from "../application";
import { UserCredentialsDTO, UserProfileDTO } from "../types/user.dto";

export const useLogin = () => {
    const setUserProfile = useStore((state) => state.setUserProfile);

    const mutation = useMutation<UserProfileDTO, APIError, UserCredentialsDTO>(
        async (credentials) => {
            const userProfile = await userService.login(credentials);
            setUserProfile(userProfile);

            return userProfile;
        }
    );
    return mutation;
};
