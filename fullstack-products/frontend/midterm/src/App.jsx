import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Form from "./pages/Form";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<Detail />} />
      <Route path="/create" element={<Form />} />
      <Route path="/edit/:id" element={<Form />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;