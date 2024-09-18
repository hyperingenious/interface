// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

<<<<<<< HEAD
import {  MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import the pages you are using
import CheckAllBreaches from "./pages/CheckAllBreaches";
=======
import { MantineProvider } from "@mantine/core";
import EmailBreachCheck from "./data/EmailBreachCheck";
import BreachAnalytics from "./data/BreachAnalytics";
import ExposedPassword from "./data/ExposedPassword";
import DataBreaches from "./data/DataBreaches";
import DomainBreaches from "./data/DomainBreaches";
>>>>>>> 9c3bbb7 (added all endpoints)

export default function App() {
  return (
    <MantineProvider>
<<<<<<< HEAD
      <BrowserRouter>
        <Routes>
          <Route path="/check-breaches" element={<CheckAllBreaches/>} />
        </Routes>
      </BrowserRouter>
=======
      <EmailBreachCheck />
      <BreachAnalytics />
      <ExposedPassword />
      <DataBreaches/>
      <DomainBreaches/>
>>>>>>> 9c3bbb7 (added all endpoints)
    </MantineProvider>
  );
}
