import {BrowserRouter as Router, Routes, Route} from "react-router";
import PrivateRoute from "./components/commons/private-route";
import Wrapper from "./components/template/wrapper";
import MenuView from "./views/menu-view";
import LoginView from "./views/login-view";
import NotFoundView from "./views/not-found-view";
import HomeView from "./views/home-view";
import StorefrontView from "./views/storefront-view.tsx";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginView/>}/>
                <Route element={<Wrapper/>}>
                    <Route path="/home" element={<PrivateRoute element={<HomeView/>}/>}/>
                    <Route path="/menu-itens" element={<PrivateRoute element={<MenuView/>}/>}/>
                </Route>

                <Route path="/storefront" element={<StorefrontView />}/>
                <Route path="*" element={<NotFoundView />}/> {/* Rota 404 */}
            </Routes>
        </Router>
    );
}

export default App;