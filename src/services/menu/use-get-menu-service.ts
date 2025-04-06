import {useQuery} from "@tanstack/react-query";
import http from "../../lib/axios/http.ts";

interface GetMenuParams {
    page: number;
    limit: number;
    search?: string;
}

const useGetMenuService = ({page, limit, search}: GetMenuParams) => {
    return useQuery({
        queryKey: ["menu", page, limit, search],
        queryFn: async () => {
            let endpoint = `/menu?page=${page}&pageSize=${limit}`;

            if (search) {
                endpoint += `&search=${encodeURIComponent(search)}`;
            }

            return http({endpoint, method: "get"});
        }
    });
};

export default useGetMenuService;