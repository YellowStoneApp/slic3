import React from "react";
import { iShout } from "../Utils/Apis/tamarak.service";
import { SplideSlide } from "@splidejs/react-splide";

interface SliderCardProps {
  shout: iShout;
}

const SliderCard = (props: SliderCardProps) => {
  const { shout } = props;
  console.log(shout);
  return (
    <SplideSlide>
      <div className="card rounded-m shadow-l mx-3">
        <div className="card-bottom text-center mb-0">
          <h1 className="color-white font-700 mb-n1">{shout.user.userName}</h1>
          <p className="color-white opacity-80 mb-4"></p>
        </div>
        <div className="card-overlay bg-gradient"></div>
        <img className="img-fluid" src={shout.url} />
      </div>
    </SplideSlide>
  );
};

export default SliderCard;
