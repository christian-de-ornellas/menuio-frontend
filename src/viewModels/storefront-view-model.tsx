import {useState} from "react";
import {useDebounce} from "../hooks/use-debounce.ts";
import useGetMenuService from "../services/menu/use-get-menu-service.ts";

export const useStorefrontViewModel = () => {
    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce(search, 1000);
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(6);
    const items = useGetMenuService({page, limit, search: debouncedSearch})

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1);
    };


    return {items, handleSearch, setPage, page, limit, search}
}
