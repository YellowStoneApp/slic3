import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Routes } from "../../Navigation/Routes";
import { identityService } from "../../Utils/Apis/Identity.service";
import { tamarakService, iShout } from "../../Utils/Apis/tamarak.service";
import { useCurrentWalletUser } from "../../Hooks/currentWalletUser.hook";
import SliderContainer from "../../Components/SliderContainer";

const GalleryContainer = () => {
  const history = useHistory();
  const customer = useCurrentWalletUser();
  const [shouts, setShouts] = useState<iShout[] | undefined>(undefined);

  const getShouts = async () => {
    try {
      const response = await tamarakService.getShouts();
      console.log(response);
      setShouts(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getShouts();
  }, []);

  if (shouts) {
    console.log("returning slider container");
    return (
      <div className="page-content header-clear-medium">
        <SliderContainer shouts={shouts} />
      </div>
    );
  }
  return <div>WAITING</div>;
};

export default GalleryContainer;

// {/* <div
//   id="menu-install-pwa-ios"
//   className="menu menu-box-bottom menu-box-detached rounded-l"
// >
//   <div className="boxed-text-xl mt-4 pb-3">
//     <img
//       className="rounded-l mb-3"
//       src="app/icons/icon-128x128.png"
//       alt="img"
//       width="90"
//     />
//     <h4 className="mt-3">Add Sticky on your Home Screen</h4>
//     <p className="mb-0 pb-0">
//       Install Sticky, and access it like a regular app. Open your Safari
//       menu and tap "Add to Home Screen".
//     </p>
//     <div className="clearfix pt-3"></div>
//     <a
//       href="#"
//       className="pwa-dismiss close-menu color-highlight text-uppercase font-700"
//     >
//       Maybe later
//     </a>
//   </div>
// </div> */}
