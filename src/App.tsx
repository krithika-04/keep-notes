import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import './styles/global.css'; 

function App() {
  return (
    <Routes>
       <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />}></Route>
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default App;
