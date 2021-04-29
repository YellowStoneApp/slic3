/**
 * This hides all of the implementation of logging a user in and out of the flow wallet application and managing that user's state
 *
 */

import { useEffect } from "react";
import { atom, useSetRecoilState, useRecoilValue } from "recoil";
import * as fcl from "@onflow/fcl";

interface iFlowUser {
  loggedIn: boolean;
  addr?: string;
  cid?: string;
}

const defaultState: iFlowUser = { loggedIn: false };

export const $currentUser = atom({
  key: "CURRENT_USER",
  default: defaultState,
});

/**
 * Subscribe to changes in the currentUser actor.
 * @returns
 */
export const CurrentUserSubscription = () => {
  const setCurrentUser = useSetRecoilState($currentUser);
  useEffect(() => fcl.currentUser().subscribe(setCurrentUser), [
    setCurrentUser,
  ]);
  return null;
};

/**
 * This is the actual hook. This decorates the current user with some helper functions for the current user.
 *
 * @returns
 */
export const useCurrentUser = () => {
  const currentUser = useRecoilValue($currentUser);
  return {
    ...currentUser,
    logOut: fcl.unauthenticate,
    logIn: fcl.logIn,
    signUp: fcl.signUp,
  };
};
