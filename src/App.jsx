// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import the pages you are using
import CheckPassHash from "./pages/CheckPassHash";
import { MainContextProvider } from "./contexts/MainContext";
import Breaches from "./pages/Breaches";
import Home from "./pages/Home";
import Domain from "./pages/Domain";

import EmailCheck from "./pages/EmailCheck";
import BreachAnalyticsPage from "./pages/BreachAnalyticsPage";

export default function App() {
  return (
    <MainContextProvider>
      <MantineProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/email-breaches" element={<EmailCheck />} />
            <Route path="/breach-analytics" element={<BreachAnalyticsPage />} />

            <Route path="/check-pass" element={<CheckPassHash />} />
            <Route path="/breaches" element={<Breaches />} />
            <Route path="/domain-breach" element={<Domain/>} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </MainContextProvider>
  );
}
