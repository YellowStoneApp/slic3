import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

interface AddGiftModalProps {
    show: boolean;
    onSubmit: (url: string) => void;
    onCancel: () => void;
}

const AddGiftModal = ({ show, onCancel, onSubmit }: AddGiftModalProps) => {
    const [url, setUrl] = useState('');

    const swallowFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleCancel = () => {
        onCancel();
        setUrl('');
    };
    const handleSubmit = () => {
        onSubmit(url);
        setUrl('');
    };

    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Add A Gift</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Tell us what you want. We'll do the rest.
                <Form onSubmit={(e) => swallowFormSubmit(e)}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label></Form.Label>
                        <Form.Control type="name" placeholder="paste url here" onChange={(e) => setUrl(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddGiftModal;
