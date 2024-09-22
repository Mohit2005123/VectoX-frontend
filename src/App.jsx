// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import IconEdit from "./pages/iconEdit";
import UploadIconEdit from "./pages/UploadIconEdit";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Define routes and map them to components */}
          <Route path="/" element={<Home />} />
          <Route path="/iconedit" element={<IconEdit />} />
          <Route path="/uploadiconedit" element={<UploadIconEdit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
