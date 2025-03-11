import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage/LandingPage";
import { PrivateRoute } from "../../react-envelope/utils/PrivateRoute";
import { SamplesPage } from "../../react-envelope/components/pages/SamplesPage/SamplesPage";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage/>}/>
                <Route element={<PrivateRoute/>}>
                    {/* <Route path='/lab' element={<SamplesPage/>}/> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}