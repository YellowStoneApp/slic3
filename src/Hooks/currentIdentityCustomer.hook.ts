/**
 * Hook is not working. Do not expect to work right now. There's a issue with how the value gets set on App load that's breaking behavior.
 */
import { useEffect } from "react";
import { atom, useSetRecoilState, useRecoilValue } from "recoil";
import { identityService } from "../Utils/Apis/Identity.service";

interface iIdentityCustomer {
  loggedIn: boolean;
}

const defaultState: iIdentityCustomer = { loggedIn: false };

export const $identityCustomer = atom({
  key: "IDENTITY_CUSTOMER",
  default: defaultState,
});

/**
 * This isn't working because I can't call useSetRecoilState from within the function. I'd rather encapsulate this here though...
 * @param username
 * @param password
 */
const login = async (username: string, password: string) => {
  //   const setIdentityCustomer = useSetRecoilState($identityCustomer);
  //   try {
  //     const response = await identityService.login(username, password);
  //     console.log(response);
  //     setIdentityCustomer({ loggedIn: true });
  //     return response;
  //   } catch (error: any) {
  //     console.log(error);
  //   }
};

export const useIdentityCustomer = () => {
  const identityCustomer = useRecoilValue($identityCustomer);
  return {
    ...identityCustomer,
  };
};
