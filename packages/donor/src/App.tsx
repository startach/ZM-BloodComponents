import React from "react";
import "./styles/index.scss";
import AppRouter from "./navigation/AppRouter";
import Div100vh from "react-div-100vh";

export default function DonorApp() {
  return (
    <Div100vh>
      HEADER GOES HERE
      <AppRouter />
    </Div100vh>
  );
}
