import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="background-image">
      <div className="App">
        <h1>Hello there</h1>
        <Switch>
          <Route path="/" exact>
            {/* <LoginPage/> */}
          </Route>

          <Route path="/user/:id" exact>
            {/* <UserPage/> */}
          </Route>

          <Route path="/shop/:id" exact>
            {/* <ShopPage/> */}
          </Route>

          <Route>
            <h3>Error 404</h3>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
