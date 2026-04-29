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
// import PrivateRoute from '../../components/PrivateRoute';

const router = createBrowserRouter([
    {
        path: "/",
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
        // element: (
        //     <PrivateRoute>
    //     //         <DashboardLayout />
    //     //     </PrivateRoute>
    // ),
        Component: DashboardLayout,
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