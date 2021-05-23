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
    const { gift, position, numCardsInRow, removeGift, isAuthorized } = props;

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

    let positionInRow = getRowPosition(position, numCardsInRow);
    if (positionInRow === PositionInRow.Left && numCardsInRow === 1) {
        positionInRow = PositionInRow.None;
    }

    return (
        <div className={cardsToClassName[numCardsInRow] + ' ' + positionInRow}>
            <div className="card ms-3 rounded-m card-style">
                {isAuthorized ? (
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
                <a target="_blank" href={gift.affiliateUrl ? gift.affiliateUrl : gift.url} title={gift.title}>
                    <img src={gift.image} data-src={gift.image} className="preload-img img-fluid round-m" alt="img" />
                </a>
                <div className="content">
                    <h4>{gift.title}</h4>
                    <p>{gift.description}</p>
                    {/* <a
              href="#"
              className="icon icon-xxs shadow-m rounded-s bg-facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a> */}
                    {/* Actual FB Share button
          <div
            className="fb-share-button"
            data-href="http://localhost:3000/gallery?id=262e208c-6800-4996-bbfd-2388a580c602#"
            data-layout="button"
            data-size="small"
          >
            <a
              target="_blank"
              href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A3000%2Fgallery%3Fid%3D262e208c-6800-4996-bbfd-2388a580c602%23&amp;src=sdkpreparse"
              className="fb-xfbml-parse-ignore"
            >
              Share
            </a>
          </div> */}
                    {/* <a
            href="#"
            className="icon icon-xxs shadow-m rounded-s bg-twitter me-1 ms-1"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="icon icon-xxs shadow-m rounded-s bg-pinterest">
            <i className="fab fa-pinterest-p"></i>
          </a> */}
                </div>
            </div>
        </div>
    );
};

export default GiftItem;
