import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export default function useUserData() {

    return (
        useQuery({
            queryKey: ['currentUserData'],
            queryFn: () => axios.get('https://linked-posts.routemisr.com/users/profile-data', {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            }),
            select: (data) => data.data.user
        })
    )
}
