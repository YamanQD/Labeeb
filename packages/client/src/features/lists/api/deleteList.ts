import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/lib/react-query";
import { listService } from "../application";
import { LISTS_QUERY_KEY } from "./keys";

export const useDeleteList = () => {
    const mutation = useMutation(
        (id: number) => {
            return listService.deleteList(id);
        },
        {
            onSuccess() {
                queryClient.invalidateQueries([LISTS_QUERY_KEY]);
            },
        }
    );

    return mutation;
};
