import { useMutation } from "react-query";
import { queryClient } from "src/lib/react-query";

import { userService } from "../../services";
import { CreateUserDTO } from "../../services/dto";

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
