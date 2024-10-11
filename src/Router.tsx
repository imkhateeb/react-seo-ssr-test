import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Contact from "./serverComponents/Contact";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};
