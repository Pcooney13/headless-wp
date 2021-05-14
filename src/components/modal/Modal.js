import React from "react";
import { ReactComponent as SVGCloseX } from "../../assets/svgs/close-x.svg";
import { motion, AnimatePresence } from "framer-motion";

const modalVariant = {
    initial: { opacity: 0 },
    isOpen: { opacity: 1 },
    exit: { opacity: 0 },
};
const containerVariant = {
    initial: { top: "-50%", transition: { type: "spring" } },
    isOpen: { top: "0%" },
    exit: { top: "-75%" },
};

const Modal = ({ handleClose, children, isOpen }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-green-200 z-50"
                    style={{ background: "rgba(203, 216, 211, 0.875)" }}
                    initial={"initial"}
                    animate={"isOpen"}
                    exit={"exit"}
                    variants={modalVariant}
                >
                    <motion.div
                        className="max-w-128 bg-white relative rounded-lg border border-bright-green"
                        variants={containerVariant}
                    >
                        <SVGCloseX
                            className="w-6 h-6 absolute top-4 right-4 text-green hover:text-bright-green transition-all duration-300 transform hover:scale-150 fill-current"
                            onClick={handleClose}
                        />                        
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;