import Header from "./components/Header/Header";
import Navigate from "./components/Navigate/Navigate";
import Users from "./components/Users/Users";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container" id="page">
      <Navigate />
      <Header />
      <Users />
      <RegisterForm />
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
