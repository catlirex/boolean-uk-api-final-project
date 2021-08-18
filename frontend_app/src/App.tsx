import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import CoffeeDetailsPage from "./Pages/CoffeeDetailsPage";
import CoffeeList from "./Pages/CoffeeListPage";
import LoginPage from "./Pages/LoginPage";
import ShopPage from "./Pages/ShopPage";
import UserPage from "./Pages/UserPage";

function App() {
  return (
    <div className="background-image">
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <LoginPage />
          </Route>

          <Route path="/user/shopList" exact>
            <ShopPage />
          </Route>

          <Route path="/user/coffeeList" exact>
            <CoffeeList />
          </Route>

          <Route path="/user/coffeeDetails" exact>
            <CoffeeDetailsPage />
          </Route>

          <Route path="/user/transactionRecord" exact>
            {/* transaction record list */}
          </Route>

          <Route path="/user/:id">
            <UserPage />
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
