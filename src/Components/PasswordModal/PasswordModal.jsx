
"use client";

import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authorizationContext } from './../Context/AuthorizationContextProvider/AuthorizationContextProvider';

const formSchema = zod.object({
    password: zod.string().min(3, 'minimum 3 letters'),
    newPassword: zod.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must have...."),
    passwordConformation: zod.string().nonempty('must enter password conformation')
}).refine((values) => {
    return values.newPassword === values.passwordConformation
}, {
    message: `passwords doesn't match`,
    path: ['passwordConformation']
})

export function PasswordModal() {

    const [openModal, setOpenModal] = useState(false);

    const { handleSubmit, formState, register } = useForm({
        defaultValues: {
            password: '',
            newPassword: '',
            passwordConformation: '',
        },
        mode: "onBlur",
        resolver: zodResolver(formSchema)
    })
    const { clearToken } = useContext(authorizationContext)

    const navigateTo = useNavigate()

    function customHandleSubmit(data) {
        const reqData = {
            password: data.password,
            newPassword: data.newPassword,
        }
        axios.patch('https://linked-posts.routemisr.com/users/change-password', reqData, {
            headers: {
                token: localStorage.getItem('tkn')
            }
        })
            .then((res) => {

                toast.success('Password is updated successfully', {
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

                if (res.data.message === 'success') {
                    localStorage.setItem('tkn', res.data.token)
                }
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
                className="w-full bg-transparent focus:ring-0 dark:focus:ring-0 cursor-pointer text-primary font-bold text-lg 
                hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent  border-2 border-stone-400 justify-between py-6"
                onClick={() => setOpenModal(true)}>
                Change password
                <i className="fa-solid fa-chevron-right"></i>
            </Button>


            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <ModalHeader className="bg-background" />
                <ModalBody className="bg-background" >
                    <form onSubmit={handleSubmit(customHandleSubmit)} >
                        <div className="space-y-6">
                            <div>
                                <div className="mb-2 block">
                                    <Label className="text-foreground! font-semibold" htmlFor="currentPassword">Current Password</Label>
                                </div>
                                <input
                                    placeholder="Current Password"
                                    className="w-full bg-input rounded-sm p-2"
                                    {...register("password")} id="currentPassword"
                                    type="password"
                                    required
                                />
                                {formState.errors.password && formState.touchedFields.password && <p className="text-red-600"> {formState.errors.password.message} </p>}
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="newPassword" className="text-foreground! font-semibold">New Password</Label>
                                </div>
                                <input
                                    placeholder="New Password"
                                    className="w-full bg-input rounded-sm p-2"
                                    {...register("newPassword")}
                                    id="newPassword"
                                    type="password"
                                    required
                                />
                                {formState.errors.newPassword && formState.touchedFields.newPassword && <p className="text-red-600" > {formState.errors.newPassword.message} </p>}
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="passwordConformation" className="text-foreground! font-semibold">Password Conformation</Label>
                                </div>
                                <input
                                    placeholder="New Password"
                                    className="w-full bg-input rounded-sm p-2"
                                    {...register("passwordConformation")}
                                    id="passwordConformation"
                                    type="password"
                                    required
                                />
                                {formState.errors.passwordConformation && formState.touchedFields.passwordConformation && <p className="text-red-600"> {formState.errors.passwordConformation.message} </p>}
                            </div>

                            <div className="w-full">
                                <Button type="submit" className="cursor-pointer bg-primary! font-semibold  w-fit block mx-auto ">Change password</Button>
                            </div>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </>
    );
}
