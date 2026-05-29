import {

BrowserRouter,
Routes,
Route

} from "react-router-dom";

import HomePage from "../pages/HomePage";
import PcListPage from "../pages/PcListPage";
import PcDetailPage from "../pages/PcDetailPage";
import PcEditPage from "../pages/PcEditPage";

function AppRouter() {

return (

<BrowserRouter>

  <Routes>

    <Route
      path="/"
      element={<HomePage />}
    />

    <Route
      path="/pc-list"
      element={<PcListPage />}
    />

    <Route
      path="/pc-detail/:pcNumber"
      element={<PcDetailPage />}
    />

    <Route
      path="/pc-edit/:pcNumber"
      element={<PcEditPage />}
    />

  </Routes>

</BrowserRouter>

);

}

export default AppRouter;
