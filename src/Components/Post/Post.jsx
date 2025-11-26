import React, { useContext, useState } from 'react'
import img from '../../assets/5.jpg'
import moment from 'moment/moment'
import CommentSection from '../CommentSection/CommentSection'
import { Dropdown, DropdownItem } from 'flowbite-react'
import { authorizationContext } from '../Context/AuthorizationContextProvider/AuthorizationContextProvider'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Bounce, toast } from 'react-toastify'
import UpdatePost from '../UpdatePost/UpdatePost'

export default function Post({ post }) {

    const hasImage = !!post.image
    const Comments = structuredClone(post.comments).reverse()
    const [showCommentSection, setShowCommentSection] = useState(false)
    const { userId } = useContext(authorizationContext)

    const [toggleOptions, setToggleOptions] = useState(false)

    const queryClient = useQueryClient()
    const { mutate: deletePost } = useMutation({
        mutationFn: () => axios.delete(`https://linked-posts.routemisr.com/posts/${post.id}`, {
            headers: {
                token: localStorage.getItem('tkn'),

            }
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(['posts']);
            queryClient.invalidateQueries(['userPosts', userId]);

            toast.success('Post is deleted successfully', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                containerId: 'addingComment',
            });
            setToggleOptions(false)
        }
    })


    return (
        <div className='post px-4 py-2.5  mb-5 rounded-xl border-1 border-border shadow-xl  '>
            <header className='flex justify-between items-center' >
                <div className="left-part flex justify-between items-center">
                    <div className="profile-img me-2.5">
                        <img src={post.user.photo} alt="" className='size-16 rounded-full' />
                    </div>
                    <div className="post-data">
                        <p className='mb-1'>{post.user.name}</p>
                        <p> {moment(post.createdAt).startOf('hour').fromNow()} </p>
                    </div>
                </div>

                {post.user._id === userId && (
                    <div className='relative'>
                        <span
                            className='font-bold cursor-pointer inline-block p-3'
                            onClick={() => { setToggleOptions(!toggleOptions) }} >
                            <i className="fa-solid fa-ellipsis"></i>
                        </span>

                        {toggleOptions && (
                            <ul className='absolute  top-[100%] right-0 bg-secondary p-2 rounded-sm w-[160px] ' >
                                <li className='px-2  cursor-pointer my-2 hover:bg-accent hover:text-accent-foreground py-2 text-center rounded-sm '>
                                    <UpdatePost postId={post.id} setToggleOptions={setToggleOptions} />
                                </li>
                                <li
                                    className='cursor-pointer px-2 my-2 text-secondary-foreground text-center hover:bg-accent hover:text-accent-foreground rounded-sm  font-semibold py-2 '
                                    onClick={deletePost}  >
                                    Delete
                                </li>
                            </ul>
                        )}
                    </div>
                )}

            </header>

            <section className="body my-4">

                <p className='mb-1.5 break-all'>{post.body} </p>
                <div className="image-container">
                    {hasImage && <img src={post.image} alt="" className='w-full' />}
                </div>
            </section>

            <footer>
                <button
                    className='text-center text-primary-foreground px-3 py-2 rounded-lg cursor-pointer mb-2 block w-fit mx-auto bg-primary '
                    onClick={() => { setShowCommentSection(!showCommentSection) }}
                >
                    Comment
                </button>

                {showCommentSection && <CommentSection postId={post.id} />}

            </footer>
        </div>
    )
}
// ; 