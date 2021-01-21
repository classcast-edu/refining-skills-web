import React, { useState } from "react";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./customModal.css";
const CustomModal = ({ children, open, onCloseModal, onOpenModal }) => {
	return (
		<div>
			<Modal
				open={open}
				onClose={onCloseModal}
				center
				classNames={{
					// overlay: "customOverlay",
					modal: "customModal",
				}}
			>
				{children}
			</Modal>
		</div>
	);
};

export default CustomModal;
