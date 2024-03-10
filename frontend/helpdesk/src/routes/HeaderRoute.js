import React from "react";
import { Outlet } from "react-router-dom";
import { observer } from "mobx-react";
import { Header } from "../layouts/Header";

export const HeaderRoute = observer((props) => {
  return (
    <div data-testid="HeaderRoute">
      <Header />
      <Outlet />
    </div>
  );
});

export default HeaderRoute;
