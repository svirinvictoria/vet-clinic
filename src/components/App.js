import { Routes, Route } from "react-router-dom";
import PetTicket from "./PetTicket";
import Homepage from "./Homepage";
// import Update from "./Update";
import PetInfo from "./PetInfo";

function App() {
  return (
    <div className="pages">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/petticket/:id" element={<PetTicket />} />
        {/* <Route path="/update/:id" element={<Update />} /> */}
        <Route path="/petinfo/:id" element={<PetInfo />} />
      </Routes>
    </div>
  );
}

export default App;
