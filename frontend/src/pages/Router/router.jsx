import { createBrowserRouter } from 'react-router';
import Home from '../../Layouts/HomeLayout/Home';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    }
])

export default router;