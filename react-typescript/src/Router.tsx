import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={`${process.env.PUBLIC_URL}/`}>
          <Coins />
        </Route>
        <Route path={`${process.env.PUBLIC_URL}/:coinId`}>
          <Coin />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
