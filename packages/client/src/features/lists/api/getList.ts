import { useQuery } from "@tanstack/react-query";
import { listService } from "../application";
import { LISTS_QUERY_KEY } from "./keys";

interface UseGetListProps {
    id: number;
}

export const useGetList = ({ id }: UseGetListProps) => {
    const fetchList = async () => {
        return listService.getList(id);
    };

    return useQuery([LISTS_QUERY_KEY, { id }], fetchList, {});
};
