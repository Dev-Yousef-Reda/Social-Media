import React, { useContext, useState } from 'react'
import img from './../../assets/pf.png'
import moment from 'moment'
import { object } from 'zod'
import { authorizationContext } from '../Context/AuthorizationContextProvider/AuthorizationContextProvider'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Bounce, toast } from 'react-toastify'
import { UpdateComment } from '../UpdateComment/UpdateComment'

export default function CommentCard({ comment, postId }) {

    if (!comment) {
        return
    }

    const [toggleOptions, setToggleOptions] = useState(false)
    const { userId } = useContext(authorizationContext)
    const hasImage = !(comment?.commentCreator.photo).includes('undefined')
    const queryClient = useQueryClient()


    const { mutate: deleteComment, isPending: deletingComment } = useMutation({
        mutationFn: () => axios.delete(`https://linked-posts.routemisr.com/comments/${comment._id}`, {
            headers: {
                token: localStorage.getItem('tkn')
            }
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(['postComments', postId])
            queryClient.invalidateQueries(['posts'])            

            setToggleOptions(false)
            toast.success('Comment is deleted successfully', {
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
        }

    })

    return (
        <>
            <header className='flex justify-between ' >
                <div className="left-part flex justify-between items-center">
                    <div className="profile-img me-2.5">
                        <img src={hasImage ? comment.commentCreator.photo : img} alt="" className='size-12 rounded-full' />
                    </div>
                    <div className="post-data">
                        <p className='mb-1'>{comment.commentCreator.name}</p>
                        <p> {moment(comment.createdAt).startOf('hour').fromNow()} </p>
                    </div>
                </div>

                {userId === comment.commentCreator._id && (
                    <div className='relative' >
                        <span
                            className="right-part indent-2.5 font-black cursor-pointer"
                            onClick={() => { setToggleOptions(!toggleOptions) }}>
                            <i className="fa-solid fa-ellipsis"></i>
                        </span>
                        {toggleOptions && (
                            <ul className='absolute right-0 top-1/2 bg-secondary text-secondary-foreground px-3 rounded-sm w-[160px] '>
                                <li className='cursor-pointer my-3 font-semibold hover:bg-accent hover:accent-accent-foreground! rounded-sm ' >
                                    <UpdateComment commentId={comment.id} postId={postId} />
                                </li>
                                <li
                                    className='cursor-pointer mb-3 font-semibold px-2 hover:bg-accent hover:text-accent-foreground rounded-sm py-2 text-center '
                                >
                                    <span onClick={deleteComment} >
                                        {deletingComment ? 'Loading' : 'Delete'}
                                    </span>
                                </li>
                            </ul>
                        )}
                    </div>
                )}


            </header>

            <section className="body my-4">
                <p className='mb-1.5 ps-2.5'>{comment.content} </p>
            </section>
        </>
    )
}
