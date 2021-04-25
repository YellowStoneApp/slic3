import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { Routes } from "../../Navigation/Routes";
import { identityService } from "../../Utils/Apis/Identity.service";
import { tamarakService } from "../../Utils/Apis/tamarak.service";

const GalleryContainer = () => {
  const history = useHistory();

  const signout = async () => {
    console.log("signing out");
    await identityService.signOut();
    console.log("redirecting");
    history.push(Routes.Login);
  };

  const healthCheck = async () => {
    await tamarakService.dummyCall();
  };

  const getShouts = async () => {
    const response = await tamarakService.getShouts();
    console.log(response);
  };

  return (
    <div>
      <h1>You in a private spot motha fucka</h1>
      <Button onClick={signout}>SIGN OUT</Button>
      <Button onClick={healthCheck}>GET HEALTH</Button>
      <Button onClick={getShouts}>GET SHOUTS</Button>
    </div>
  );
};

export default GalleryContainer;
