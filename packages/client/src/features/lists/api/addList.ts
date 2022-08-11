import { useMutation } from "@tanstack/react-query";
import { queryClient } from "src/lib/react-query";
import { listService } from "../application";
import { CreateProjectListDTO } from "../types/list.dto";
import { LISTS_QUERY_KEY } from "./keys";

export const useAddList = () => {
    const mutation = useMutation(
        (list: CreateProjectListDTO) => {
            return listService.createList(list);
        },
        {
            onSuccess() {
                queryClient.invalidateQueries([LISTS_QUERY_KEY]);
            },
        }
    );

    return mutation;
};
