import {
  createBrowserRouter,
  
} from "react-router";
import Rootlayout from "../layouts/Rootlayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddBlog from "../pages/Addblog/Addblog";
import Allblogs from "../pages/Allblogs/Allblogs";
import BlogDetails from "../pages/BlogDetails/Blogdetails";
import WishlistPage from "../pages/Wishlist/WishlistPage";
import Featured from "../pages/Featured/Featured";
import UpdateBlog from "../pages/UpdateBlog/Updateblog";
import PrivateRoute from "../context/PrivsteRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component:Rootlayout,
    children:[
        {
            index:true,
            Component: Home

        },
        {
            path:'/login',
            Component:Login
        },
        {
            path:'/register',
            Component: Register
        },
        {
        path: '/add-blog',
        element: <PrivateRoute><AddBlog /></PrivateRoute>
        },
        {
        path: '/all-blogs',
        element: <Allblogs />
        },
        {
        path: '/blogs/:id',
        element: <PrivateRoute><BlogDetails /></PrivateRoute>
        },
        {
        path: '/wishlist',
        element: <PrivateRoute><WishlistPage /></PrivateRoute>
        },
        {
        path: '/featured-blogs',
        element: <Featured />
        },
        {
        path: '/blogs/update/:id',
        element: <PrivateRoute><UpdateBlog /></PrivateRoute>
        }

    ]
  },
  
]);

export default router;