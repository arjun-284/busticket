import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Routers from "../../routes/Router.jsx";

const Layout = () => {
  return (
    <>
      <Header />
      <Routers />
      <Footer />
    </>
  )
}

export default Layout;