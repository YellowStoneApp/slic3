import React from "react";
import { Modal } from "react-bootstrap";

interface ProfileEditModalProps {
  onClose: () => {};
  show: boolean;
}

const ProfileEditModal = (props: ProfileEditModalProps) => {
  return (
    <>
      <Modal show={props.show} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
      </Modal>
    </>
  );
};

export default ProfileEditModal;
