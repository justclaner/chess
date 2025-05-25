import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Board from "./Board";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/board" element={<Board />} />
    </Routes>
  )
};

export default App;
