// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import the pages you are using
import CheckPassHash from "./pages/CheckPassHash";
import { MainContextProvider } from "./contexts/MainContext";

export default function App() {
  return (
    <MainContextProvider>
      <MantineProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/check-pass" element={<CheckPassHash />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </MainContextProvider>
  );
}
