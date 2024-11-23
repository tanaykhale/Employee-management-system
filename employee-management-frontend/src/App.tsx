import { RouterProvider } from "react-router-dom";

import "./App.css";
import Approutes from "./pages/Approutes";

const App = () => {
  return <RouterProvider router={Approutes} />;
};

export default App;
