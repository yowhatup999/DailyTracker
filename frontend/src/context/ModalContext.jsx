// src/context/ModalContext.jsx
import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modalData, setModalData] = useState(null);

    const openModal = (data) => setModalData(data);
    const closeModal = () => setModalData(null);

    return (
        <ModalContext.Provider value={{ modalData, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);
