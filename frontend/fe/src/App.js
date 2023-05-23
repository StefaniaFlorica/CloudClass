import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useLocalState } from "./utils/useLocalStorage";
import Dashboard from "./components/dashboard";
import CodeReviewerDashboard from "./components/codeReviewerDashboard";
import Homepage from "./components/homepage";
import Login from "./components/login";
import PrivateRoute from "./components/privateRoute";
import AssignmentView from "./components/assignment";
import "bootstrap/dist/css/bootstrap.min.css";
import { DashboardFactory } from "./components/dashboardFactory";
import { AssignmentFactory } from "./components/assignmentFactory";
import { UserProvider } from "./utils/userProvider";
function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");

  // useEffect(() => {
  //   if (!jwt) {
  //     const reqBody = {
  //       username: "stefi123",
  //       password: "asdfasdf",
  //     };
  //     fetch("api/auth/login", {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       method: "post",
  //       body: JSON.stringify(reqBody),
  //     })
  //       .then((response) => Promise.all([response.json(), response.headers]))
  //       .then(([body, headers]) => {
  //         setJwt(headers.get("authorization"));
  //       });
  //   }
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardFactory />
          </PrivateRoute>
        }
      />
      <Route
        path="/assignments/:assignmentId"
        element={
          <PrivateRoute>
            <AssignmentFactory />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
