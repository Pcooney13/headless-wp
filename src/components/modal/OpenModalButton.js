import React from "react";
import { motion } from "framer-motion";

const animatedOpenButton = ({ children, handlClick }) => {
    return (
        <motion.button
            className="text-white"
            onClick={handlClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            {children}
        </motion.button>
    );
};

export default animatedOpenButton;
