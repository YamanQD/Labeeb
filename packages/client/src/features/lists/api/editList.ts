import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/lib/react-query";
import { listService } from "../application";
import { EditProjectListDTO } from "../types/list.dto";
import { LISTS_QUERY_KEY } from "./keys";

export const useEditList = () => {
    const mutation = useMutation(
        (list: EditProjectListDTO) => {
            return listService.editList(list);
        },
        {
            onSuccess() {
                queryClient.invalidateQueries([LISTS_QUERY_KEY]);
            },
        }
    );

    return mutation;
};
