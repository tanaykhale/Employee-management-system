import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

const Login = lazy(() => import("./Login"));
const Signup = lazy(() => import("./Signup"));
const Home = lazy(() => import("./Home"));
const EnterEmployee = lazy(() => import("./EnterEmployee"));
const EmployeeList = lazy(() => import("./EmployeeList"));
const AdminPanel = lazy(() => import("./AdminPanel"));

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const isToken = localStorage.getItem("token");
  return isToken ? element : <Navigate to="/login" replace />;
};

const Approutes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Signup />
      </Suspense>
    ),
  },
  {
    path: "home",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <PrivateRoute element={<Home />} />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <AdminPanel></AdminPanel>
          </Suspense>
        ),
      },
      {
        path: "create",
        element: (
          <Suspense>
            <EnterEmployee></EnterEmployee>
          </Suspense>
        ),
      },
      {
        path: "display",
        element: (
          <Suspense>
            <EmployeeList></EmployeeList>
          </Suspense>
        ),
      },
    ],
  },
]);

export default Approutes;
