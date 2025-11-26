
"use client";

import { Button, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import useChangeUserPhoto from "./useChangeUserPhoto";

export function UserPhotoModal({ setToggleMenu }) {

    const {
        handlePhotoSubmit, clearInput, handleChangePhoto, onCloseModal, openModal, setOpenModal, photoInput,
        hasImage, image
    } = useChangeUserPhoto({ setToggleMenu })


    return (
        <>
            <Button
                className="rounded-lg cursor-pointer bg-primary! font-semibold w-max "
                onClick={() => setOpenModal(true)}>
                Upload Photo
            </Button>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>

                <ModalHeader
                    className="bg-background"
                    onClick={clearInput}
                />

                <ModalBody className="bg-background" >
                    <div className="space-y-6">

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="photo" className="cursor-pointer text-foreground! font-semibold ">
                                    Upload Photo
                                    <span className="ms-3"><i className="fa-solid fa-image"></i></span>
                                </Label>
                            </div>
                            <TextInput
                                ref={photoInput}
                                id="photo"
                                type="file"
                                className="hidden"
                                onChange={handleChangePhoto}
                            />

                            {hasImage && (
                                <div className="image-preview my-7">
                                    <img className="w-full" src={image} alt="" />
                                </div>
                            )}
                        </div>

                        <div className="w-full">
                            <Button
                                onClick={handlePhotoSubmit}
                                className="cursor-pointer bg-primary! font-semibold w-fit block mx-auto ">
                                Change Photo
                            </Button>
                        </div>

                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}
