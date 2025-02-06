import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bills from "./components/Bills";
import NewBill from "./components/NewBill";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Bills />} />
          <Route path="/create" element={<NewBill />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
