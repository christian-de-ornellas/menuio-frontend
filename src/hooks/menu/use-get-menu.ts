import {useQuery} from "@tanstack/react-query";
import http from "../../lib/axios/http.ts";

const useGetMenu = () => {
    return useQuery({queryKey:["menu"], queryFn:async()=>{
        return http({endpoint:"/menu",method:"get"});
        }})
}

export default useGetMenu