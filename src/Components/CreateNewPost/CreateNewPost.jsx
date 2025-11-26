import { useContext, useRef, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Bounce, toast } from "react-toastify"
import { authorizationContext } from "../Context/AuthorizationContextProvider/AuthorizationContextProvider"

export default function CreateNewPost({ updatePost = false, postId = undefined, setOpenModal = undefined, setToggleOptions =undefined }) {

    const [image, setImage] = useState(null)
    const hasImage = !!image
    const [uploadPreview, setUploadPreview] = useState(false)
    const textInput = useRef(null)
    const imageInput = useRef(null)
    const { userId } = useContext(authorizationContext)
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: handlePostUpload,

        onSuccess: () => {
            queryClient.invalidateQueries(['posts']);
            queryClient.invalidateQueries(['userPosts', userId]);

            if (updatePost) {
                toast.success('Post is Updated successfully', {
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

                setOpenModal(false)
                setToggleOptions(false)
            }
            if (!updatePost) {
                toast.success('Post is added successfully', {
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
        }
    })

    function handlePostUpload() {

        const formData = new FormData();

        if (textInput.current.value) {
            formData.set('body', textInput.current.value)
        }
        if (imageInput.current.files.length > 0) {
            formData.set('image', imageInput.current.files[0])
        }

        handlePreviewClose(true)

        if (updatePost) {
            return axios.put(`https://linked-posts.routemisr.com/posts/${postId}`, formData, {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            })
        }
        return axios.post('https://linked-posts.routemisr.com/posts', formData, {
            headers: {
                token: localStorage.getItem('tkn')
            }
        })
    }

    function handlePreviewClose(closeAll = false) {
        if (closeAll) {
            setUploadPreview(false)
            textInput.current.value = null
        }
        imageInput.current.value = null
        setImage(null)
    }

    function handleImageUpload() {
        setImage(URL.createObjectURL(imageInput.current.files[0]))
    }

    return (
        <section className="my-3.5 bg-white px-3 py-5 rounded-xl border-1 border-border shadow-xl ">
            <input
                type="text"
                className='border-2 border-stone-300 py-3 cursor-pointer px-2 w-full block rounded-lg '
                placeholder={`What's in your mind?`}
                onClick={() => { setUploadPreview(true) }}
                ref={textInput} />

            {uploadPreview && (
                <div className="preview">
                    {hasImage && (
                        <div className="relative mt-3.5">
                            <img src={image} alt={`${textInput.current?.value}`} className="w-full" />
                            <span
                                className="absolute top-4 right-4 text-4xl cursor-pointer text-white"
                                onClick={() => { handlePreviewClose() }} >
                                <i className="fa-solid fa-circle-xmark"></i>
                            </span>
                        </div>
                    )}
                    <label htmlFor="image" className="cursor-pointer mt-3.5 inline-block ps-2 bg-primary py-2 px-4 rounded-xl text-white font-semibold">
                        Upload Photo <i className="fa-solid fa-image"></i>
                        <input
                            type="file"
                            id="image"
                            className="hidden"
                            ref={imageInput}
                            onChange={handleImageUpload} />
                    </label>

                    <div className="mt-3.5 ">
                        {isPending ? (
                            <button
                                disabled type="button"
                                className=" cursor-pointer inline-block ps-2 bg-blue-500 py-1.5 w-[49%] px-2 rounded-xl text-white font-bold ">
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                                Loading...
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="cursor-pointer inline-block ps-2 bg-primary py-1.5 w-[49%] px-2 rounded-xl text-white font-semibold "
                                onClick={mutate}>
                                {updatePost ? `Update Post` : `Create Post`}

                            </button>
                        )}

                        <button
                            type="button"
                            className="cursor-pointer inline-block ps-2 bg-secondary text-secondary-foreground py-1.5 w-[49%] ms-[1%] px-2 rounded-xl  font-semibold"
                            onClick={() => { handlePreviewClose(true) }}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

        </section>
    )
}
