import React from "react";
import { iShout } from "../Utils/Apis/tamarak.service";
import SliderCard from "./SliderCard";
import { Splide } from "@splidejs/react-splide";
import { snapshot_UNSTABLE } from "recoil";

interface SliderContainerProps {
  shouts: iShout[];
}

const SliderContainer = (props: SliderContainerProps) => {
  return (
    <div
      className="splide single-slider slider-no-arrows slider-no-dots"
      id="single-slider-home"
    >
      <Splide
        options={{
          rewind: true,
          gap: "1rem",
          perPage: 1,
          arrows: false,
        }}
      >
        {props.shouts.map((value) => (
          <SliderCard shout={value} key={value.id} />
        ))}
      </Splide>
    </div>
  );
};

export default SliderContainer;

// <div
//   className="splide single-slider slider-no-arrows slider-no-dots"
//   id="single-slider-home"
// >
//   <div className="splide__track">
//     <div className="splide__list">
//       {props.shouts.map((value, index) => {
//         return <SliderCard />;
//       })}
//     </div>
//   </div>
// </div>
