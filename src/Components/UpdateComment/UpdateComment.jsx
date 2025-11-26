
"use client";

import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authorizationContext } from './../Context/AuthorizationContextProvider/AuthorizationContextProvider';

const formSchema = zod.object({
    content: zod.string().min(3, 'minimum 3 letters')
})

export function UpdateComment({ commentId, postId }) {

    const [openModal, setOpenModal] = useState(false);

    const { handleSubmit, formState, register } = useForm({
        defaultValues: {
            content: '',
        },
        mode: "onBlur",
        resolver: zodResolver(formSchema)
    })
    const queryClient = useQueryClient()

    function customHandleSubmit(data) {
        const reqData = {
            content: data.content,
        }
        axios.put(`https://linked-posts.routemisr.com/comments/${commentId}`, reqData, {
            headers: {
                token: localStorage.getItem('tkn')
            }
        })
            .then((res) => {
                queryClient.invalidateQueries(['postComments', postId])
                queryClient.invalidateQueries(['posts'])
                toast.success('Comment is updated successfully', {
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
            })
            .catch((res) => {

                toast.error(`${res.response.data.error}`, {
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

            })

    }

    function onCloseModal() {
        setOpenModal(false);
    }

    return (
        <>
            <Button
                className="w-max  focus:ring-0 dark:focus:ring-0 cursor-pointer font-bold  px-2 rounded-lg bg-transparent! hover:bg-accent hover:text-accent-foreground justify-between "
                onClick={() => setOpenModal(true)}>
                Update Comment
            </Button>


            <Modal show={openModal} size="md" onClose={onCloseModal}  popup>
                <ModalHeader className="bg-background" />
                <ModalBody className="bg-background" >
                    <form onSubmit={handleSubmit(customHandleSubmit)} >
                        <div className="space-y-6">
                            <div>
                                <div className="mb-2 block text-foreground ">
                                    <Label className="text-foreground! text-lg" htmlFor="currentPassword">New Comment</Label>
                                </div>
                                <input className="bg-muted p-3 rounded-sm w-full" {...register("content")} id="currentPassword" type="text" required />
                                {formState.errors.content && formState.touchedFields.content && <p className="text-red-600 mt-1" > {formState.errors.content.message} </p>}
                            </div>


                            <div className="w-full">
                                <Button type="submit" className="cursor-pointer bg-primary! font-semibold ">Update Comment</Button>
                            </div>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </>
    );
}
