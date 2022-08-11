import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../application";

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
