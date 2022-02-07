import { RootState } from "../store";
import { LoginStatus } from "@zm-blood-components/common";

export const isLoggedOut = (state: RootState) =>
  state.loginStatus.loginStatus === LoginStatus.LOGGED_OUT;

export const isLoggedIn = (state: RootState) =>
  state.loginStatus.loginStatus === LoginStatus.LOGGED_IN;

export const getLoginStatus = (state: RootState): LoginStatus =>
  state.loginStatus.loginStatus;
