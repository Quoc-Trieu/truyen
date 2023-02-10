import React, { useEffect, useState } from "react";
import { Loading } from "notiflix";
import { useRoutes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import { useNavigate } from "react-router-dom";

function AppRoutes() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState("2");

  //kiểm tra login hay chưa
  const Routes = user && user !== {} ? ProtectedRoutes : PublicRoutes;

  //khi chưa login thì chuyển về trang login
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <React.Fragment>
      <Routes />
    </React.Fragment>
  );
}

export default AppRoutes;
