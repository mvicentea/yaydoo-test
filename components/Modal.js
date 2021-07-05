import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

const ModalUI = ({labelButto, title, id="modal-component", classname="" ,children}) => {
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);
	return (
		<div>
			<Button color="info" onClick={toggle}>{labelButto}</Button>
			<Modal isOpen={modal} toggle={toggle} className={classname} id={id}>
				<ModalHeader toggle={toggle}>{title}</ModalHeader>
				<ModalBody> {children}</ModalBody>
			</Modal>
        </div>
      );
}
export default ModalUI;