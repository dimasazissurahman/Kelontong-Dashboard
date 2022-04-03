import React, { ReactNode } from 'react'
import { Modal } from 'react-bootstrap'
import { IModalFormComponent } from 'shared';

export const ModalFormComponent = (props: IModalFormComponent) => {
  var {
    show,
    onHide,
    title,
    children
  } = props;
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        {title}
      </Modal.Header>
      {children}
    </Modal>
  )
}