import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { iRegisteredCustomer } from '../../Utils/Apis/Identity.service';

interface ProfileEditModalProps {
    onClose: (customer: iRegisteredCustomer) => void;
    show: boolean;
    customer: iRegisteredCustomer;
}

const ProfileEditModal = (props: ProfileEditModalProps) => {
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    const [imageSource, setImageSource] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const imageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImageSource(files[0]);
            const url = URL.createObjectURL(files[0]);
            console.log(url);
            setImageUrl(url);
        }
        console.log(e.target.files);
    };

    return (
        <>
            <Modal show={props.show} onHide={props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row text-center row-cols-1 mb-0">
                        <div className="file-data">
                            <div
                                style={{
                                    width: '100%',
                                    marginBottom: '20',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <label
                                    style={{
                                        maxWidth: '200px',
                                        maxHeight: '200px',
                                    }}
                                >
                                    <i className="fas fa-edit color-blue-dark float-end font-13 mt-2 me-3"></i>
                                    <input type="file" style={{ display: 'none' }} id="file-upload" accept="image/*" onChange={imageSelected} />
                                    <img
                                        style={{
                                            maxWidth: '200px',
                                            maxHeight: '200px',
                                        }}
                                        src={imageUrl ?? props.customer.avatar}
                                        className="preload-img img-fluid rounded-circle"
                                        alt="img"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder={props.customer.name} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder={props.customer.bio} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.onClose(props.customer)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => props.onClose(props.customer)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProfileEditModal;
