import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react'
import axios from 'axios';
import { authorizationContext } from '../Context/AuthorizationContextProvider/AuthorizationContextProvider';

export default function useFetchUserPosts() {
    const { userId } = useContext(authorizationContext);

    return (
        useQuery({
            queryKey: ['userPosts', userId],

            queryFn: () => axios.get(`https://linked-posts.routemisr.com/users/${userId}/posts`, {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            }),

            enabled: !!userId,

            select: (data) => data.data.posts
        })

    )
}
