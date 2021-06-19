import React, { useState } from 'react';
import { Col, Row, Form, Modal, Container } from 'react-bootstrap';
import { iCustomerPublic } from '../../Utils/Apis/Identity.service';
import { iGift } from '../../Utils/Apis/tamarak.service';

interface BuyGiftModalProps {
    gift?: iGift;
    show: boolean;
    handleCancel: () => void;
    isAuthorized: boolean;
    customerPublic: iCustomerPublic | undefined;
    handleBuy: (email?: string) => void;
    handleRemoveGift: (giftId: number) => Promise<void>;
}

const BuyGiftModal = (props: BuyGiftModalProps) => {
    const { show, gift, handleCancel, handleBuy, handleRemoveGift, customerPublic, isAuthorized } = props;
    const [email, setEmail] = useState<string | undefined>(undefined);

    const handleClose = (e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (e) {
            e.preventDefault();
        }
        handleCancel();
    };

    const handleBuyAttempt = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        window.open(gift?.affiliateUrl ?? gift?.url, '_blank');

        handleBuy(email);
    };

    const handleEdit = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
    };

    const handleDelete = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        if (gift) {
            await handleRemoveGift(gift.id);
        }
        handleCancel();
    };

    /**
     * This is gonna break
     * @param name
     * @returns
     */
    const getFirstName = (name?: string) => {
        if (name) {
            const split = name.split(' ');
            return split[0];
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Body>
                <Container>
                    <Row>
                        <Col xs={18} md={6}>
                            {gift ? (
                                <div style={{ marginTop: 20 }} className="card ms-3 rounded-m card-style">
                                    <img
                                        src={
                                            gift.image === ''
                                                ? 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80'
                                                : gift.image
                                        }
                                        data-src={gift.image}
                                        className="preload-img img-fluid round-m"
                                        alt="img"
                                    />
                                    <div className="content">
                                        <h4>{gift.title}</h4>
                                    </div>
                                </div>
                            ) : (
                                <div></div>
                            )}
                            {isAuthorized ? (
                                <div className="content mb-0">
                                    <div className="row mb-0">
                                        {/* <div className="col-6">
                                            <a
                                                href="#"
                                                onClick={(e) => handleEdit(e)}
                                                className="btn btn-full btn-s rounded-s text-uppercase font-900 color-theme border-blue-dark"
                                            >
                                                edit
                                            </a>
                                        </div> */}
                                        <div className="col-6">
                                            <a
                                                // href={gift?.affiliateUrl ?? gift?.url}
                                                onClick={(e) => handleDelete(e)}
                                                target="_blank"
                                                className="btn btn-full btn-s rounded-s text-uppercase font-900 bg-red-light"
                                            >
                                                delete
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </Col>
                        <Col xs={18} md={6}>
                            <div style={{ marginTop: 20 }}>
                                <h1>{getFirstName(customerPublic?.name)} says... </h1>
                                <p>{gift?.customDescription}</p>
                                <div className="divider mt-4 mb-3"></div>
                                <h2>Let us know</h2>
                                <p>
                                    We want to make sure no one else buys this. Enter your email below and we'll follow up with you later to see if you bought
                                    this. Until then we'll prevent anyone from buying this.
                                </p>
                                <Form.Group>
                                    <Form.Control id="purchaserEmail" type="email" placeholder="what's your email" onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>
                                <div className="content mb-0">
                                    <div className="row mb-0">
                                        <div className="col-6">
                                            <a
                                                href="#"
                                                onClick={(e) => handleClose(e)}
                                                className="btn btn-full btn-s rounded-s text-uppercase font-900 color-theme border-blue-dark"
                                            >
                                                nah
                                            </a>
                                        </div>
                                        <div className="col-6">
                                            <a
                                                // href={gift?.affiliateUrl ?? gift?.url}
                                                onClick={(e) => handleBuyAttempt(e)}
                                                target="_blank"
                                                className="btn btn-full btn-s rounded-s text-uppercase font-900 bg-highlight"
                                            >
                                                buy this
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
};

export default BuyGiftModal;
