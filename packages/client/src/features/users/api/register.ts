import { useMutation } from "react-query";
import { queryClient } from "src/lib/react-query";
import { userService } from "../application";
import { CreateUserDTO } from "../types/user.dto";

export const useRegister = () => {
    const mutation = useMutation(
        (credentials: CreateUserDTO) => {
            return userService.register(credentials);
        },
        {
            onSuccess(responseData, credentials) {
                queryClient.invalidateQueries(["users"]);
            },
        }
    );

    return mutation;
};
