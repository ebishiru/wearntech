import ReactDOM from "react-dom/client";
import App from "./App";
import AllItemsProvider from "./contexts/AllItemsContext";
import AllCompaniesProvider from "./contexts/AllCompaniesContext";
import UserProvider from "./contexts/UserContext";
import CartProvider from "./contexts/CartContext";


ReactDOM.createRoot(document.getElementById("root")).render(
    <AllCompaniesProvider>
        <AllItemsProvider>
            <UserProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </UserProvider>
        </AllItemsProvider>
    </AllCompaniesProvider>
);