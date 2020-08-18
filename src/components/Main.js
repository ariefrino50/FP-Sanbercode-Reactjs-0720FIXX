import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./Header";
import Section from "./Section";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Main = () => {
  return (
    <>
      <Router>
        <Header />
        <Sidebar />
        <Section />
        <Footer />
      </Router>
    </>
  );
};

export default Main;
