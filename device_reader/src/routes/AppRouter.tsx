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
import LoanDocumentPage from "../pages/LoanDocumentPage";
import QrScanPage from "../pages/QrScanPage";
import QrCodePage from "../pages/QrCodePage";
import HistoryPage from "../pages/HistoryPage";
import PcRegisterPage from "../pages/PcRegisterPage";

function AppRouter() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainLayout><HomePage /></MainLayout>}
        />

        <Route
          path="/pc-list"
          element={<MainLayout><PcListPage /></MainLayout>}
        />

        <Route
          path="/pc-detail/:pcNumber"
          element={<MainLayout><PcDetailPage /></MainLayout>}
        />

        <Route
          path="/pc-edit/:pcNumber"
          element={<MainLayout><PcEditPage /></MainLayout>}
        />

        <Route
          path="/update-complete"
          element={<MainLayout><UpdateCompletePage /></MainLayout>}
        />

        <Route
          path="/loan-document/:pcNumber"
          element={<MainLayout><LoanDocumentPage /></MainLayout>}
        />

        <Route
          path="/qr-scan"
          element={<MainLayout><QrScanPage /></MainLayout>}
        />

        <Route
          path="/qr-code/:pcNumber"
          element={<MainLayout><QrCodePage /></MainLayout>}
        />

        <Route
          path="/history"
          element={<MainLayout><HistoryPage /></MainLayout>}
        />

        <Route
          path="/pc-register"
          element={<MainLayout><PcRegisterPage /></MainLayout>}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
