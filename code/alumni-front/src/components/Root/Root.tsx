import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import TaskBar from "../TaskBar/TaskBar";
import "./Root.scss";

const Root = () => (
  <>
    <div className="App">
      <TaskBar />
      <Outlet />
    </div>
    <Footer />
  </>
);

export default Root;
