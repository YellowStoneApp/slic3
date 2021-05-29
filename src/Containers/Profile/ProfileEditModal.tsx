import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { identityService, iRegisteredCustomer } from '../../Utils/Apis/Identity.service';
import { storageService } from '../../Utils/Apis/storage.service';

interface ProfileEditModalProps {
    onClose: (customer: iRegisteredCustomer, imageSource?: File) => void;
    onCancel: () => void;
    show: boolean;
}

const ProfileEditModal = ({ onClose, onCancel, show }: ProfileEditModalProps) => {
    const [imageSource, setImageSource] = useState<File | undefined>(undefined);
    const [avatar, setAvatar] = useState<string | undefined>(undefined);
    const [name, setName] = useState('');
    const [bio, setBio] = useState<string | undefined>(undefined);
    const [customer, setCustomer] = useState<iRegisteredCustomer | undefined>(undefined);

    const swallowFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const loadCustomer = async () => {
        const cust = await identityService.getCurrentCustomer();

        setCustomer(cust);
        setAvatar(cust?.avatar);
        setName(cust?.name ?? '');
        setBio(cust?.bio);
    };

    useEffect(() => {
        loadCustomer();
    }, []);

    const handleSubmit = async () => {
        try {
            if (customer) {
                const toReturn = {
                    ...customer,
                    avatar,
                    name,
                    bio,
                };
                onClose(toReturn, imageSource);
                resetValues();
            } else {
                handleCancel();
            }
        } catch (error) {
            // todo error on upload
            console.log(error);
        }
    };

    const handleCancel = () => {
        resetValues();
        onCancel();
    };

    const resetValues = () => {
        // setAvatar(undefined);
        // setImageSource(undefined);
        // setName('');
        // setBio(undefined);
    };

    const imageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImageSource(files[0]);
            const url = URL.createObjectURL(files[0]);
            setAvatar(url);
        }
    };

    const handleBioChange = (e: any) => {
        setBio(e.target.value);
    };

    const handleNameChange = (e: any) => {
        setName(e.target.value);
    };

    return (
        <>
            <Modal show={show} onHide={handleCancel}>
                <Modal.Header>
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
                                        src={avatar}
                                        className="preload-img img-fluid rounded-circle"
                                        alt="img"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <Form onSubmit={(e) => swallowFormSubmit(e)}>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder={name} defaultValue={name} onChange={handleNameChange} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder={bio} defaultValue={bio} onChange={(e) => handleBioChange(e)} />
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
        </>
    );
};

export default ProfileEditModal;
