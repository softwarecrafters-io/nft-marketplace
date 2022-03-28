import React, { ReactNode } from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';

export const ModalPortal = (props: { isOpened: boolean; onClose?: () => void; children: ReactNode }) => {
	const [isOpened, setIsOpen] = useState(props.isOpened);

	if (!isOpened) {
		return null;
	}

	const onClose = () => {
		if (props.onClose) {
			props.onClose();
		}
		setIsOpen(false);
	};

	return ReactDOM.createPortal(
		<div className="modal-wrapper">
			<div className="modal-container">
				<i className="icon-icon-close" onClick={onClose}>
					x
				</i>
				<div className={'content'}>{props.children}</div>
			</div>
		</div>,
		document.getElementById('modal-root') as Element
	);
};
