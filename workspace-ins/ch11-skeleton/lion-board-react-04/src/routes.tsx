import ProtectedRoute from "@/components/ProtectedRoute";
import { createBrowserRouter } from "react-router";
import { lazy } from 'react';

const Layout = lazy(() => import('@/components/layout'));
const Detail = lazy(() => import('@/pages/board/Detail'));
const Edit = lazy(() => import('@/pages/board/Edit'));
const List = lazy(() => import('@/pages/board/List'));
const New = lazy(() => import('@/pages/board/New'));
const ErrorPage = lazy(() => import('@/pages/ErrorPage'));
const MainPage = lazy(() => import('@/pages/index'));
const Login = lazy(() => import('@/pages/user/Login'));
const Signup = lazy(() => import('@/pages/user/Signup'));

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      { 
        index: true, 
        element: <MainPage /> 
      },
      { 
        path: ":type", 
        element: <List />
      },
      { 
        path: ":type/new", 
        element: (
          <ProtectedRoute>
            <New />
          </ProtectedRoute>
        )
      },
      { 
        path: ":type/:_id", 
        element: <Detail /> 
      },
      { 
        path: ":type/:_id/edit", 
        element: (
          <ProtectedRoute>
            <Edit />
          </ProtectedRoute>
        )
      },
      { 
        path: "user/login", 
        element: <Login /> 
      },
      { 
        path: "user/signup",
        element: <Signup />
      },
    ]
  },
]);

export default router;