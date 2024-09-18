// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import the pages you are using
import CheckPassHash from "./pages/CheckPassHash";
import { MainContextProvider } from "./contexts/MainContext";
// import CheckAllBreaches from "./pages/CheckAllBreaches";
import Home from "./pages/Home";
import EmailCheck from "./pages/EmailCheck";

export default function App() {
  return (
    <MainContextProvider>
      <MantineProvider>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/email-breaches" element={<EmailCheck />} />

            <Route path="/check-pass" element={<CheckPassHash />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </MainContextProvider>
  );
}
