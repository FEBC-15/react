import Layout from "@/components/layout";
import Detail from "@/pages/board/Detail";
import Edit from "@/pages/board/Edit";
import List from "@/pages/board/List";
import New from "@/pages/board/New";
import ErrorPage from "@/pages/ErrorPage";
import MainPage from "@/pages/index";
import Login from "@/pages/user/Login";
import Signup from "@/pages/user/Signup";
import ProtectedRoute from "@/components/ProtectedRoute";

import { createBrowserRouter } from "react-router";

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