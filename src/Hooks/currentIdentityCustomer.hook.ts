/**
 * Hook is not working. Do not expect to work right now. There's a issue with how the value gets set on App load that's breaking behavior.
 */
import { atom, useRecoilValue, useRecoilState } from "recoil";
import { iUser } from "../Utils/Apis/tamarak.service";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

interface iIdentityCustomer {
  loggedIn: boolean;
  user?: iUser; // this gets set after creating an account.
}

const defaultState: iIdentityCustomer = { loggedIn: false };

export const identityCustomerState = atom({
  key: "IDENTITY_CUSTOMER",
  default: defaultState,
  effects_UNSTABLE: [persistAtom],
});

export const useIdentityCustomer = () => {
  const identityCustomer = useRecoilValue(identityCustomerState);
  return {
    ...identityCustomer,
  };
};
