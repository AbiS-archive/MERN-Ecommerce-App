import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/Layout";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import AdminLayout from "./components/admin-view/AdminLayout";
import AdminDashboard from "./Pages/admin-view/AdminDashboard";
import AdminProducts from "./Pages/admin-view/AdminProducts";
import AdminOrders from "./Pages/admin-view/AdminOrders";
import AdminFeatures from "./Pages/admin-view/AdminFeatures";
import ShoppingLayout from "./components/shopping-view/ShoppingLayout";
import NotFound from "./Pages/not-found";
import ShoppingHome from "./Pages/shopping-view/home";
import ShoppingListing from "./Pages/shopping-view/listing";
import ShoppingCheckout from "./Pages/shopping-view/checkout";
import ShoppingAccount from "./Pages/shopping-view/account";
import CheckAuth from "./components/common/CheckAuth";
import UnauthPage from "./Pages/unauth/UnauthPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth/authSlice";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturnPage from "./Pages/shopping-view/paypal-return";
import PaypalCancelPage from "./Pages/shopping-view/paypal-cancel";
import PaymentSuccessPage from "./Pages/shopping-view/payment-success";
import SearchProducts from "./Pages/shopping-view/search";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"))
    dispatch(checkAuth(token));
  }, [dispatch]); 

  if (isLoading) return <Skeleton className="w-[800px] bg-black h-[600px]" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              
            </CheckAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="paypal-cancel" element={<PaypalCancelPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnauthPage />} />
      </Routes>
    </div>
  );
}

export default App;
