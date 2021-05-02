import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const modalVariant = {
    initial: { opacity: 0 },
    isOpen: { opacity: 1 },
    exit: { opacity: 0 },
};
const containerVariant = {
    initial: { top: "-50%", transition: { type: "spring" } },
    isOpen: { top: "50%" },
    exit: { top: "-50%" },
};
const Modal = ({ handleClose, children, isOpen }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-green-200 z-50"
                    style={{background:"rgba(203, 216, 211, 0.875)"}}
                    initial={"initial"}
                    animate={"isOpen"}
                    exit={"exit"}
                    variants={modalVariant}
                >
                    <motion.div
                        className="w-1/3 h-1/2 bg-white absolute top-50 left-50 rounded-lg border border-bright-green transform -translate-y-1/2"
                        variants={containerVariant}
                    >
                        <svg
                            className="w-6 h-6 absolute top-4 right-4 text-green hover:text-bright-green transition-all duration-300 transform hover:scale-150 fill-current"
                            onClick={handleClose}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <title>close</title>
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
