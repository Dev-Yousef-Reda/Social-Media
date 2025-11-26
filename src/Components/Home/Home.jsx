import { useInfiniteQuery } from '@tanstack/react-query'
import Loader from '../Loader/Loader'
import axios from 'axios'
import { useEffect } from 'react'
import Post from '../Post/Post'
import CreateNewPost from '../CreateNewPost/CreateNewPost'

export default function Home() {

    const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading, isError, error } = useInfiniteQuery({
        queryKey: ['posts'],

        queryFn: ({ pageParam = 1 }) => {
            return axios.get('https://linked-posts.routemisr.com/posts?limit=15', {
                headers: {
                    token: localStorage.getItem('tkn'),
                },
                params: {
                    sort: '-createdAt',
                    page: pageParam,
                }
            })
        },

        getNextPageParam: (response) => {
            const { currentPage, numberOfPages, nextPage } = response.data.paginationInfo;
            return currentPage < numberOfPages ? nextPage : undefined;
        }
    })

    useEffect(() => {

        function handleScroll() {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight) {
                if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage()
                }
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)

    }, [isFetchingNextPage, hasNextPage, fetchNextPage])

    if (isLoading) {
        return <Loader />
    };

    if (isError) {
        return <p> {error.message} </p>
    };

    return (

        <>
            <CreateNewPost />

            {data.pages.map((page) =>
                page.data.posts.map((post) =>
                    <Post post={post} key={post.id} />
                )
            )}

            {isFetchingNextPage && (
                <p className='text-center text-red-800 font-black'>Loading . . .</p>
            )}
        </>

    )
}
