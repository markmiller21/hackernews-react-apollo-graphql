import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import {
  SubscriptionClient,
  addGraphQLSubscriptions
} from "subscriptions-transport-ws";

import { GC_AUTH_TOKEN } from "./constants";
import "./styles/index.css";

import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient
} from "react-apollo";

const GRAPHCOOL_ENDPOINTS = {
  simple: "https://api.graph.cool/simple/v1/cj95s5mti2j390126czcetdn9",
  subscriptions:
    "wss://subscriptions.us-west-2.graph.cool/v1/cj95s5mti2j390126czcetdn9"
};

const networkInterface = createNetworkInterface({
  uri: GRAPHCOOL_ENDPOINTS.simple
});

const wsClient = new SubscriptionClient(GRAPHCOOL_ENDPOINTS.subscriptions, {
  reconnect: true,
  connectionParams: {
    authToken: localStorage.getItem(GC_AUTH_TOKEN)
  }
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      const token = localStorage.getItem(GC_AUTH_TOKEN);
      req.options.headers.authorization = token ? `Bearer ${token}` : null;
      next();
    }
  }
]);

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

registerServiceWorker();
