import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage/LandingPage";
import { PrivateRoute } from "../../react-envelope/utils/PrivateRoute";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage/>}/>
                <Route element={<PrivateRoute/>}>
                    <Route path='/lab' element={<div></div>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}