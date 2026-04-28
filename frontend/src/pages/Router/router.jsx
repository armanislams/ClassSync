import { createBrowserRouter } from 'react-router';
import Home from '../../Layouts/HomeLayout/Home';
import Login from '../../Layouts/AuthLayout/Login';
import Register from '../../Layouts/AuthLayout/Register';

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
    }
])

export default router;