import React, { useState } from "react";
import Modal from "./Modal";
import OpenModalButton from "./OpenModalButton";


export default function App() {
    const [isOpen, toggle] = useState(false);

    function handlOpenModal(open) {
        console.log("close modal");
        toggle(open);
    }

    return (
        <div className="ml-auto">
            <OpenModalButton handlClick={() => handlOpenModal(true)}>
                Open modal
            </OpenModalButton>
            <Modal isOpen={isOpen} handleClose={() => handlOpenModal(false)}>
                <div className="h-full w-full flex justify-center items-center">
                    <h1 className="text-green"> Awesome modal </h1>
                </div>
            </Modal>
        </div>
    );
}
