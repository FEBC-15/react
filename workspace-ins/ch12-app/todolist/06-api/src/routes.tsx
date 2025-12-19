import Layout from "@/components/Layout";
import About from "@/pages/About";
import ErrorPage from "@/pages/ErrorPage";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import TodoAdd from "@/pages/TodoAdd";
import TodoEdit from "@/pages/TodoEdit";
import TodoInfo from "@/pages/TodoInfo";
import TodoList from "@/pages/TodoList";
import { todoListLoader } from "@/routes/todo.loader";
import { createBrowserRouter, Navigate } from "react-router";

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/home" /> },
  { path: '/home', element: <Home /> },
  { path: '/about', element: <About /> },

  {
    path: '/todo',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <TodoList /> }, // index 라우트: URL이 부모 라우트의 URL 까지만 일치할 경우 기본으로 렌더링 될 자식 라우트 지정
      { 
        path: 'list', 
        loader: todoListLoader,
        element: <TodoList />, 
      },
      { path: 'add', element: <TodoAdd /> },
      { 
        path: 'list/:_id', // 동적 세그먼트 지정. _id는 useParams() 훅으로 꺼낼 수 있음
        element: <TodoInfo />, 
        children: [
          { path: 'edit', element: <TodoEdit /> },
        ]
      },
    ]
  },

  { path: '*', element: <NotFound /> } // catch-all 라우트: 위의 라우트와 일치하지 않은 모든 URL

]);

export default router;