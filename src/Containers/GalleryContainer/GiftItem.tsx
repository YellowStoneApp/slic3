import { getByTitle } from "@testing-library/dom";
import React from "react";
import { iGift } from "../../Utils/Apis/tamarak.service";

interface GiftItemProps {
  gift: iGift;
}

const GiftItem = (props: GiftItemProps) => {
  const { gift } = props;
  return (
    <a
      className="col"
      data-gallery="gallery-1"
      target="_blank"
      href={gift.affiliateUrl ? gift.affiliateUrl : gift.url}
      title={gift.title}
    >
      <img
        src={gift.image}
        className="preload-img img-fluid rounded-xs"
        alt="img"
      />
      <p className="font-600 pb-1">{gift.title}</p>
    </a>
  );
};

export default GiftItem;
