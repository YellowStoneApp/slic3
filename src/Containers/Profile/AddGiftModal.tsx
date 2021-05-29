import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { logService } from '../../Utils/Apis/logging.service';
import { iGiftRequest } from '../../Utils/Apis/tamarak.service';
import { giftRegistry, linkPreview } from '../../Utils/Apis/Utils/gift.registry';

interface AddGiftModalProps {
    show: boolean;
    onSubmit: (gift: iGiftRequest) => void;
    onCancel: () => void;
}

const AddGiftModal = ({ show, onCancel, onSubmit }: AddGiftModalProps) => {
    const [url, setUrl] = useState('');
    const [gift, setGift] = useState<linkPreview | undefined>(undefined);
    const [details, setDetails] = useState<string | undefined>(undefined);
    const [quantity, setQuantity] = useState(1);

    const swallowFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleCancel = () => {
        onCancel();
        resetState();
    };

    const resetState = () => {
        setUrl('');
        setGift(undefined);
        setDetails(undefined);
        setQuantity(1);
    };

    const handleSubmit = () => {
        if (gift) {
            onSubmit({
                url: url,
                title: gift.title,
                description: gift.description,
                image: gift.image,
                customDescription: details,
                quantity: quantity,
            });
        }
        resetState();
    };

    const setUrlValue = async (url: string) => {
        try {
            const preview = await giftRegistry.previewGift(url);
            setGift(preview);
            setUrl(url);
        } catch (error) {
            logService.error(error);
        }
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
                        <Form.Label>URL</Form.Label>
                        <Form.Control id="urlpaste" type="name" placeholder="paste url here" onChange={(e) => setUrlValue(e.target.value)} />
                        <Form.Label>Additional Details</Form.Label>
                        <Form.Control
                            id="giftdescription"
                            type="description"
                            placeholder="what size? what color?"
                            onChange={(e) => setDetails(e.target.value)}
                        />
                        <Form.Label>How Many?</Form.Label>
                        <Form.Control as="select" onChange={(e) => setQuantity(parseInt(e.target.value))}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
                {gift ? (
                    <div style={{ marginTop: 20 }} className="card ms-3 rounded-m card-style">
                        <a target="_blank" href="#" title={gift.title}>
                            <img src={gift.image} data-src={gift.image} className="preload-img img-fluid round-m" alt="img" />
                        </a>
                        <div className="content">
                            <h4>{gift.title}</h4>
                            <p>{gift.description}</p>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
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
