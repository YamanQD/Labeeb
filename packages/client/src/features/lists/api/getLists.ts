import { useQuery } from "@tanstack/react-query";
import { listService } from "../application";
import { LISTS_QUERY_KEY } from "./keys";

export const useGetLists = () => {
    const fetchLists = async () => {
        return listService.getLists();
    };

    return useQuery([LISTS_QUERY_KEY], fetchLists, {});
};
