import Header from "./ui/Header.jsx";
import LoginForm from "./features/authentication/LoginForm.jsx";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import RegisterForm from "./features/authentication/RegisterForm.jsx";
import Home from "./pages/Home.jsx";
import ProductDetail from "./features/products/ProductDetail.jsx";
import ShoppingCart from "./pages/ShoppingCart.jsx";
import Shipping from "./pages/Shipping.jsx";
import Payment from "./pages/Payment.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Order from "./pages/Order.jsx";
import Profile from "./pages/Profile.jsx";
import AdminRoute from "./ui/AdminRoute.jsx";
import ProductList from "./admin/products/ProductList.jsx";
import OrderList from "./admin/orders/OrderList.jsx";
import UserList from "./admin/users/UserList.jsx";

const App = () => {
    return (
        <div>
            <Header />
            <main className="w-[90%] mx-auto">
                <Routes>
                    <Route
                        element={
                            <ProtectedRoute>
                                <AppLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="/shipping" element={<Shipping />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/placeorder" element={<PlaceOrder />} />
                        <Route path="/order/:id" element={<Order />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route
                        element={
                            <ProtectedRoute>
                                <AdminRoute />
                            </ProtectedRoute>
                        }
                    >
                        <Route
                            path="/admin/productlist"
                            element={<ProductList />}
                        />
                        <Route
                            path="/admin/orderlist"
                            element={<OrderList />}
                        />
                        <Route path="/admin/users" element={<UserList />} />
                    </Route>
                    <Route index path="/" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<ShoppingCart />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                </Routes>
            </main>
            <ToastContainer />
        </div>
    );
};

export default App;
