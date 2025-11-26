import { useQuery } from "@tanstack/react-query"
import { PasswordModal } from "../PasswordModal/PasswordModal"



export default function Settings() {

    const { data, isLoading } = useQuery({
        queryKey: ['currentUserData'],
        queryFn: () => axios.get('https://linked-posts.routemisr.com/users/profile-data', {
            headers: {
                token: localStorage.getItem('tkn')
            }
        }),
        select: (data) => data.data.user
    })

    return (
        <PasswordModal />
    )
}
