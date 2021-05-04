import React from "react";
import { iShout } from "../Utils/Apis/tamarak.service";
import { SplideSlide } from "@splidejs/react-splide";

interface SliderCardProps {
  shout: iShout;
}

const SliderCard = (props: SliderCardProps) => {
  const { shout } = props;
  console.log(shout);
  const purchase = async () => {
    console.log(`Purchased ${shout}`);
  };

  return (
    <SplideSlide>
      <div className="card rounded-m shadow-l mx-3">
        <div className="card-bottom text-center mb-0">
          <h1 className="color-white font-700 mb-n1">{shout.user.userName}</h1>
          <p className="color-white opacity-80 mb-4"></p>
          <a
            href="#"
            onClick={purchase}
            className="btn btn-s btn-full text-uppercase font-900 bg-red-dark rounded-s me-2 ms-2 mb-2"
          >
            Purchase
          </a>
        </div>
        <div className="card-overlay bg-gradient"></div>
        <img className="img-fluid" src={shout.url} />
      </div>
    </SplideSlide>
  );
};

export default SliderCard;
