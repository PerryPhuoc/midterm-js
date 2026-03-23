import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Form from "./pages/Form";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<Detail />} />
      <Route path="/create" element={<Form />} />
      <Route path="/edit/:id" element={<Form />} />
    </Routes>
  );
}

export default App;