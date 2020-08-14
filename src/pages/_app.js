import React from "react";
import "./../styles/global.scss";
import IndexPage from "./index";
import { Switch, Route, Router } from "./../util/router.js";
import NotFoundPage from "./not-found.js";
import Footer from "./../components/Footer";

function App(props) {
  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/" component={IndexPage} />

          <Route component={NotFoundPage} />
        </Switch>

        <Footer
          bg="white"
          textColor="dark"
          size="md"
          bgImage=""
          bgImageOpacity={1}
          description="A short description of what you do here"
          copyright="© 2019 Company"
          logo="https://uploads.divjoy.com/logo.svg"
        />
      </>
    </Router>
  );
}

export default App;
