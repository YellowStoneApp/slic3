import { atom } from "recoil";

interface iError {
  message?: string;
}

const defaultState: iError = {};

export const errorState = atom({
  key: "ERROR",
  default: defaultState,
});
