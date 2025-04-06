import {BrowserRouter as Router, Routes, Route} from "react-router";
import HomePage from "./pages/home";
import {StorefrontPage} from "./pages/storefront";
import PrivateRoute from "./components/commons/private-route";
import NotFoundPage from "./pages/not-found";
import Wrapper from "./components/template/wrapper";
import MenuView from "./views/menu-view";
import LoginView from "./views/login-view";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginView/>}/>
                <Route element={<Wrapper/>}>
                    <Route path="/home" element={<PrivateRoute element={<HomePage/>}/>}/>
                    <Route path="/menu-itens" element={<PrivateRoute element={<MenuView/>}/>}/>
                </Route>

                <Route path="/storefront" element={<StorefrontPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/> {/* Rota 404 */}
            </Routes>
        </Router>
    );
}

export default App;