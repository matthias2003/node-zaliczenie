import { Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import './App.css';
import { AuthGate } from "./components/AuthGate/AuthGate";

function App() {
  return (
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/reg" element={<Register />}></Route>
            <Route element={<AuthGate />}>
                <Route path="/home" element={<Home />}></Route>
            </Route>
        </Routes>
  );
}

export default App;
