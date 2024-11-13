import {Route, Routes} from "react-router-dom";
import HomePage from './pages/HomePage.jsx';
import Dashboard from "./pages/Dashboard.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
    return (
<div>
    <Navbar/>
    <Routes>
        <Route path={"/"} element={<HomePage />}/>
        <Route path={"/dashboard"} element={<Dashboard />}/>
    </Routes>
</div>
    )
}

export default App
