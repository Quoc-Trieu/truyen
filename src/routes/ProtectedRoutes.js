import { Routes, Route } from "react-router-dom";
import Home from "./../pages/Home/Home";
import Map from "./../pages/tab/map/Map";
import TreeManage from "./../pages/tab/treeManage/TreeManage";
import Assignment from "./../pages/tab/assignmentManage/Assignment";
import UserManage from "./../pages/tab/userManage/UserManage";

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<Map />} />
        <Route path="/userManage" element={<UserManage />} />
        <Route path="/assignment" element={<Assignment />} />
        <Route path="/treeManage" element={<TreeManage />} />
      </Route>
    </Routes>
  );
};
export default ProtectedRoutes;
