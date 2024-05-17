import { Theme } from "@radix-ui/themes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home";
import { TutorProfile } from "./pages/tutor_profile";

function App() {
  return (
    <Theme appearance="light">
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/tutors/:tutorId" Component={TutorProfile} />
        </Routes>
      </BrowserRouter>
    </Theme>
  );
}

export default App;
