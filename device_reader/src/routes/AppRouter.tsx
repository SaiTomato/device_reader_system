import {

BrowserRouter,
Routes,
Route

} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/HomePage";
import PcListPage from "../pages/PcListPage";
import PcDetailPage from "../pages/PcDetailPage";
// import PcEditPage from "../pages/PcEditPage";

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
      // element={<MainLayout><PcEditPage /></MainLayout>}
    />

  </Routes>

</BrowserRouter>

);

}

export default AppRouter;
