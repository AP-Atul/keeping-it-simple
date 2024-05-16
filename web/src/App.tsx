import { Theme } from "@radix-ui/themes";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home";
import { TutorProfile } from "./pages/tutor_profile";
import { signInAnon } from "./services";

function App() {
  useEffect(() => {
    signInAnon();
  });
  return (
    <Theme>
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
