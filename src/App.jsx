import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Detailed from "./pages/Detailed";
import AddMovie from "./pages/AddMovie";
import Favorites from "./pages/Favorites";
import UpdateMovie from "./pages/UpdateMovie";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/:id" element={<Detailed />} />
      <Route path="/:id/update" element={<UpdateMovie />} />
      <Route path="/add" element={<AddMovie />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}

export default App;
