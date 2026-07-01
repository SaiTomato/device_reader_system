import {

BrowserRouter,
Routes,
Route

} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/HomePage";
import PcListPage from "../pages/PcListPage";
import PcDetailPage from "../pages/PcDetailPage";
import PcEditPage from "../pages/PcEditPage";
import UpdateCompletePage from "../pages/UpdateCompletePage";
import QrScanPage from "../pages/QrScanPage";
import QrCodePage from "../pages/QrCodePage";
import HistoryPage from "../pages/HistoryPage";
import PcRegisterPage from "../pages/PcRegisterPage";
import ScrollToTop from "../components/common/ScrollToTop";
import LoginPage from "../pages/LoginPage";
import { AdminRoute, GuestRoute, UserRoute } from "./AuthRoute";

function AppRouter() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
          <GuestRoute>
            <MainLayout>
              <LoginPage />
            </MainLayout>
          </GuestRoute>}
        />

        <Route
          path="/home"
          element={
          <UserRoute>
            <MainLayout>
              <HomePage />
            </MainLayout>
          </UserRoute>}
        />

        <Route
          path="/pc-list"
          element={
          <AdminRoute>
            <MainLayout>
              <PcListPage />
            </MainLayout>
          </AdminRoute>}
        />

        <Route
          path="/pc-detail/:pcNumber"
          element={
          <UserRoute>
            <MainLayout>
              <PcDetailPage />
            </MainLayout>
          </UserRoute>}
        />

        <Route
          path="/pc-edit/:pcNumber"
          element={
          <AdminRoute>
            <MainLayout>
              <PcEditPage />
            </MainLayout>
          </AdminRoute>}
        />

        <Route
          path="/update-complete/:pcNumber"
          element={
          <AdminRoute>
            <MainLayout>
              <UpdateCompletePage />
            </MainLayout>
          </AdminRoute>}
        />

        <Route
          path="/qr-scan"
          element={
          <UserRoute>
            <MainLayout>
              <QrScanPage />
            </MainLayout>
          </UserRoute>}
        />

        <Route
          path="/qr-code/:pcNumber"
          element={
          <UserRoute>
            <MainLayout>
              <QrCodePage />
            </MainLayout>
          </UserRoute>}
        />

        <Route
          path="/history"
          element={
          <AdminRoute>
            <MainLayout>
              <HistoryPage />
            </MainLayout>
          </AdminRoute>}
        />

        <Route
          path="/pc-register"
          element={
          <AdminRoute>
            <MainLayout>
              <PcRegisterPage />
            </MainLayout>
          </AdminRoute>}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
