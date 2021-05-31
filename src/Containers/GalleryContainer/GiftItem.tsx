import { getByTitle } from '@testing-library/dom';
import { stringify } from 'query-string';
import React, { useState } from 'react';
import { iGift } from '../../Utils/Apis/tamarak.service';

type AllowedCardsPerRow = 1 | 2 | 3;

interface GiftItemProps {
    gift: iGift;
    position: number;
    numCardsInRow: AllowedCardsPerRow;
    removeGift: (id: number) => void;
    isAuthorized: boolean;
    handleBuyGift: (gift: iGift) => void;
}

enum PositionInRow {
    Left = 'pe-0',
    Middle = 'pe-0 ps-0',
    Right = 'ps-0',
    None = '',
}

const cardsToClassName = {
    1: 'col-12',
    2: 'col-6',
    3: 'col-4',
};

const GiftItem = (props: GiftItemProps) => {
    const { gift, position, numCardsInRow, removeGift, isAuthorized, handleBuyGift } = props;
    const [showRemove, setShowRemove] = useState(false);

    const getRowPosition = (position: number, numCardsInRow: AllowedCardsPerRow) => {
        // left most in row
        if (position % numCardsInRow === 0) {
            return PositionInRow.Left;
        }
        // right most in row
        if ((position + 1) % numCardsInRow === 0) {
            return PositionInRow.Right;
        }
        return PositionInRow.Middle;
    };

    const handleRemoveGift = () => {
        removeGift(gift.id);
    };

    const handleBuy = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        handleBuyGift(gift);
    };

    let positionInRow = getRowPosition(position, numCardsInRow);
    if (positionInRow === PositionInRow.Left && numCardsInRow === 1) {
        positionInRow = PositionInRow.None;
    }

    return (
        <div
            className={cardsToClassName[numCardsInRow] + ' ' + positionInRow}
            onMouseEnter={() => setShowRemove(true)}
            onMouseLeave={() => setShowRemove(false)}
        >
            <div className="card ms-3 rounded-m card-style">
                {isAuthorized && showRemove ? (
                    <div className="card-top-right">
                        <a href="#" onClick={handleRemoveGift}>
                            <span className="icon icon-m rounded-circle bg-red-light ms-3 mt-3">
                                <i className="fa color-white fa-trash"></i>
                            </span>
                        </a>
                    </div>
                ) : (
                    <></>
                )}
                <img src={gift.image} data-src={gift.image} className="preload-img img-fluid round-m" alt="img" />
                <div className="content">
                    <h4>{gift.title}</h4>
                    <p>{gift.customDescription ?? gift.description}</p>
                </div>
                <a
                    href="#"
                    style={{ margin: '10px' }}
                    onClick={(e) => handleBuy(e)}
                    className="btn btn-full btn-s rounded-s text-uppercase font-900 bg-highlight"
                >
                    {gift.vendor ? <div>Buy At {gift.vendor}</div> : <div>Buy This</div>}
                </a>
            </div>
        </div>
    );
};

export default GiftItem;
