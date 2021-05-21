/**
 * Hook is not working. Do not expect to work right now. There's a issue with how the value gets set on App load that's breaking behavior.
 */
import { atom, useRecoilValue, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
import { iCustomerPublic } from "../Utils/Apis/Identity.service";

const { persistAtom } = recoilPersist();

export interface iAuthCustomer {
  customer?: iCustomerPublic; // this gets set after creating an account.
}

const defaultState: iAuthCustomer = {};

export const authCustomerState = atom({
  key: "IDENTITY_CUSTOMER",
  default: defaultState,
  effects_UNSTABLE: [persistAtom],
});

export const useAuthCustomer = () => {
  const identityCustomer = useRecoilValue(authCustomerState);
  return {
    ...identityCustomer,
  };
};
