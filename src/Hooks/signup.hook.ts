import { atom } from "recoil";

interface iSignUp {
  email?: string;
  password?: string;
}

const defaultState: iSignUp = {};

export const signUpState = atom({
  key: "SIGNUP",
  default: defaultState,
});
