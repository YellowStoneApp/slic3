import { getByTitle } from "@testing-library/dom";
import { stringify } from "query-string";
import React, { useState } from "react";
import { iGift } from "../../Utils/Apis/tamarak.service";

type AllowedCardsPerRow = 1 | 2 | 3;

interface GiftItemProps {
  gift: iGift;
  position: number;
  numCardsInRow: AllowedCardsPerRow;
}

enum PositionInRow {
  Left = "pe-0",
  Middle = "pe-0 ps-0",
  Right = "ps-0",
}

const cardsToClassName = {
  1: "col-12",
  2: "col-6",
  3: "col-4",
};

const GiftItem = (props: GiftItemProps) => {
  const { gift, position, numCardsInRow } = props;

  const getRowPosition = (
    position: number,
    numCardsInRow: AllowedCardsPerRow
  ) => {
    // left most in row
    if (position % numCardsInRow === 0) {
      console.log("Left");
      return PositionInRow.Left;
    }
    // right most in row
    if ((position + 1) % numCardsInRow === 0) {
      console.log("Right");
      return PositionInRow.Right;
    }
    console.log("Middle");
    return PositionInRow.Middle;
  };

  const positionInRow = getRowPosition(position, numCardsInRow);

  return (
    <div className={cardsToClassName[numCardsInRow] + " " + positionInRow}>
      <div className="card card-style">
        <a
          target="_blank"
          href={gift.affiliateUrl ? gift.affiliateUrl : gift.url}
          title={gift.title}
        >
          <img
            src={gift.image}
            data-src={gift.image}
            className="preload-img img-fluid round-m"
            alt="img"
          />
          <div className="content">
            <h4>{gift.title}</h4>
            <p>{gift.description}</p>
            <a
              href="#"
              className="icon icon-xxs shadow-m rounded-s bg-facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="icon icon-xxs shadow-m rounded-s bg-twitter me-1 ms-1"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="icon icon-xxs shadow-m rounded-s bg-pinterest"
            >
              <i className="fab fa-pinterest-p"></i>
            </a>
          </div>
        </a>
      </div>
    </div>
  );
};

export default GiftItem;
