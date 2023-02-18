import { createBrowserRouter } from "react-router-dom";
import App from "../App";

export default createBrowserRouter([
  {
    path: '/',
    element: <App type={"normal"}/>
  },
  {
    path: '/advance',
    element: <App type={"advance"}/>
  }
]);