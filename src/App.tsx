import { BrowserRouter as Router, Routes, Route } from "react-router";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import { StorefrontPage } from "./pages/storefront";
import PrivateRoute from "./components/commons/private-route";
import NotFoundPage from "./pages/not-found";
import CreateMenu from "./pages/create-menu";
import Wrapper from "./components/template/wrapper";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />

                <Route element={<Wrapper/>}>
                  <Route path="/home" element={<PrivateRoute element={<HomePage />} />} />
                  <Route path="/create-menu" element={<PrivateRoute element={<CreateMenu />} />} />
                </Route>

                <Route path="/storefront" element={<StorefrontPage />} />
                <Route path="*" element={<NotFoundPage />} /> {/* Rota 404 */}
            </Routes>
        </Router>
    );
}

export default App;