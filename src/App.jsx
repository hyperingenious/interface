// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import {  MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import the pages you are using
import CheckAllBreaches from "./pages/CheckAllBreaches";

export default function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/check-breaches" element={<CheckAllBreaches/>} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
