import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AppProvider } from "@shopify/polaris";

import { Home, NotFound, Orders } from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/orders" exact component={Orders} />
          <Route component={NotFound} />
        </Switch>
      </AppProvider>
    </BrowserRouter>
  );
}
