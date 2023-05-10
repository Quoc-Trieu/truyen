import { Routes, Route } from "react-router-dom";
import Home from "./../pages/Home/Home";
import Map from "./../pages/tab/map/Map";
import TreeManage from "./../pages/tab/treeManage/TreeManage";
import Assignment from "./../pages/tab/assignmentManage/Assignment";
import UserManage from "./../pages/tab/userManage/UserManage";
import AttendanceCheck from "./../pages/tab/attendanceCheck/AttendanceCheck";
import Divisions from "./../pages/tab/assignmentManage/Divisions";
import StatisticsProduction from "./../pages/tab/statisticsProduction/StatisticsProduction";
import TinhLuong from "./../pages/tab/tinhLuong/TinhLuong";
import TacGiaManage from './../pages/tab/tacgiaManage/TacGiaManage'
import BinhLuanManage from './../pages/tab/binhluanManage/BinhLuanManage'

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<UserManage />} />
        <Route path="/tacgiaManage" element={<TacGiaManage />} />
        <Route path="/binhluanManage" element={<BinhLuanManage />} />
      </Route>
    </Routes>
  );
};
export default ProtectedRoutes;
