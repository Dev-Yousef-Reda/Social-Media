
"use client";

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useState } from "react";
import CreateNewPost from "../CreateNewPost/CreateNewPost";

export default function UpdatePost({ postId , setToggleOptions }) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Button
                onClick={() => setOpenModal(true)}
                className={`bg-transparent h-fit dark:bg-transparent block w-full text-center hover:bg-accent hover:text-accent-foreground focus:ring-0 px-0 py-0  font-semibold cursor-pointer dark:hover:bg-transparent`}>
                Update Post
            </Button>

            <Modal show={openModal} onClose={() => setOpenModal(false)} >
                <ModalHeader className="bg-white dark:bg-white"></ModalHeader>

                <ModalBody className="bg-white dark:bg-white rounded-b-lg">
                    <CreateNewPost postId={postId} updatePost={true} setOpenModal={setOpenModal} setToggleOptions={setToggleOptions} />
                </ModalBody>

            </Modal>
        </>
    );
}
