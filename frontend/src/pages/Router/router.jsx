import { createBrowserRouter, Navigate } from 'react-router';
import Home from '../../Layouts/HomeLayout/Home';
import Login from '../../Layouts/AuthLayout/Login';
import Register from '../../Layouts/AuthLayout/Register';
import DashboardLayout from '../../Layouts/DashboardLayout/DashboardLayout';
import DashboardHome from '../../Layouts/DashboardLayout/DashboardHome';
import AddSlot from '../Teacher/AddSlot';
import MySlots from '../Teacher/MySlots';
import BookSlot from '../Student/BookSlot';
import MyBookings from '../Student/MyBookings';
import PrivateRoute from '../../context/PrivateRoute/PrivateRoute';
import Loader from '../../components/common/Loader';
import Error from '../../components/common/Error';

const router = createBrowserRouter([
    {
        path: "/",
        hydrateFallbackElement: <Loader/>,
        errorElement: <Error/>,
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: <DashboardHome />
            },
            {
                path: "add-slot",
                element: <AddSlot />
            },
            {
                path: "my-slots",
                element: <MySlots />
            },
            {
                path: "book-slot",
                element: <BookSlot />
            },
            {
                path: "my-bookings",
                element: <MyBookings />
            },
        ]
    },
    {
        path: "*",
        element: <Navigate to="/" replace />
    }
])

export default router;