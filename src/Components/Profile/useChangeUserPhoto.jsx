import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRef, useState } from 'react';
import { Bounce, toast } from 'react-toastify';

export default function useChangeUserPhoto({ setToggleMenu }) {

    const [openModal, setOpenModal] = useState(false);
    const [image, setImage] = useState(null);
    const hasImage = !!image;
    const photoInput = useRef(null)


    const queryClient = useQueryClient()

    function onCloseModal() {
        setOpenModal(false);
    }

    function handleChangePhoto() {
        const imageURL = URL.createObjectURL(photoInput.current.files[0])
        setImage(imageURL)
    }

    function clearInput() {
        photoInput.current.value = '';
        setImage(null)
    }

    function handlePhotoSubmit() {
        const data = new FormData()
        data.set('photo', photoInput.current.files[0])
        clearInput()
        setOpenModal(false)
        setToggleMenu(false)
        axios.put('https://linked-posts.routemisr.com/users/upload-photo', data, {
            headers: {
                token: localStorage.getItem('tkn')
            }
        }).then(() => {
            queryClient.invalidateQueries(['currentUserData'])

            toast.success('New Photo is uploaded', {
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


    return {
        handlePhotoSubmit, clearInput, handleChangePhoto, onCloseModal, openModal, setOpenModal, photoInput,
        hasImage, image, setImage
    }
}
