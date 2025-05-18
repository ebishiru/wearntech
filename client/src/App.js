import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Header from "./Header"
import Home from "./pages/Home"
import CompanyPage from "./pages/CompanyPage"
import ViewItemsPage from "./pages/ViewItemsPage"
import ViewCartPage from "./pages/ViewCartPage"
import AboutPage from "./pages/AboutPage"
import AllCompanies from "./pages/AllCompanies"
import ViewItemPage from "./pages/ViewItemPage"
import LogInPage from "./pages/LogInPage"
import SignUpPage from "./pages/SignUpPage";
import Confirmation from "./pages/ConfirmationPage"

const App = () => {
    return <Router>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies" element={<AllCompanies/>}/>
            <Route path="/company/:_id" element={<CompanyPage />} />
            <Route path="/items" element={<ViewItemsPage />} />
            <Route path="/item/:_id" element={<ViewItemPage />}/>
            <Route path="/cart/:_id" element={<ViewCartPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/logIn" element={<LogInPage />} />
            <Route path="/signUp" element={<SignUpPage />}/>
            <Route path="/order/:_id/receipt" element={<Confirmation/>}/>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </Router>
}

export default App