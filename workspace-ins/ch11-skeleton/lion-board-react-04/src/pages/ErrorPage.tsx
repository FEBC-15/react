import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";

function ErrorPage() {
  const err = useRouteError();
  let message = '예상하지 못한 에러가 발생했습니다.';

  if (isRouteErrorResponse(err) && err.status === 404) {
    message = '존재하지 않는 페이지입니다.';
  }
  
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-700 dark:text-gray-200 transition-color duration-500 ease-in-out">
      <Header />
      <main className="flex-1 py-20 bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg flex flex-col items-center space-y-2">
        <h2 className="text-xl font-semibold mb-2 text-center">🚧 앗, 무언가 잘못됐네요!</h2>
        <h3 className="text-md font-semibold mb-2 text-center">{ message }</h3>
        <Link to="/" className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600">
          ⚙️ 홈으로 이동
        </Link>
      </main>
      <Footer />
    </div>
  );
}

export default ErrorPage;