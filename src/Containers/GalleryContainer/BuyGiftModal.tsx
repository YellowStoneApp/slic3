import React, { useState } from 'react';
import { Col, Row, Form, Modal, Container } from 'react-bootstrap';
import { iGift } from '../../Utils/Apis/tamarak.service';

interface BuyGiftModalProps {
    gift?: iGift;
    show: boolean;
    handleCancel: () => void;
    handleBuy: (email?: string) => void;
}

const BuyGiftModal = (props: BuyGiftModalProps) => {
    const { show, gift, handleCancel, handleBuy } = props;
    const [email, setEmail] = useState<string | undefined>(undefined);

    const handleClose = (e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (e) {
            e.preventDefault();
        }
        handleCancel();
    };

    const handleBuyAttempt = () => {
        handleBuy(email);
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Body>
                <Container>
                    <Row>
                        <Col xs={9} md={6}>
                            {gift ? (
                                <div style={{ marginTop: 20 }} className="card ms-3 rounded-m card-style">
                                    <img src={gift.image} data-src={gift.image} className="preload-img img-fluid round-m" alt="img" />
                                    <div className="content">
                                        <h4>{gift.title}</h4>
                                    </div>
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </Col>
                        <Col xs={9} md={6}>
                            <div style={{ marginTop: 20 }}>
                                <h1>Ryan says... </h1>
                                <p>{gift?.customDescription}</p>
                                <div className="divider mt-4 mb-3"></div>
                                <h2>Let us know</h2>
                                <p>
                                    We want to make sure no one else buys this. Enter your email below and we'll follow up with you later to see if you bought
                                    this thing. Until then we'll prevent anyone from buying this.
                                </p>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email</Form.Label>
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
                                                href={gift?.affiliateUrl ?? gift?.url}
                                                onClick={handleBuyAttempt}
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
