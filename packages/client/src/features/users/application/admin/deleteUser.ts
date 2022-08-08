import { useMutation, useQueryClient } from "react-query";

import { userService } from "../../services";

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(
        (id: number) => {
            return userService.deleteUser(id);
        },
        {
            onSuccess() {
                queryClient.invalidateQueries(["users"]);
            },
        }
    );

    return mutation;
};
