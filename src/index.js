import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import "./styles/index.css";

// 1
import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient
} from "react-apollo";

const SIMPLE_GRAPHCOOL_API_ENDPOINT =
  "https://api.graph.cool/simple/v1/cj95s5mti2j390126czcetdn9";

// 2
const networkInterface = createNetworkInterface({
  uri: SIMPLE_GRAPHCOOL_API_ENDPOINT
});

// 3
const client = new ApolloClient({
  networkInterface
});

// 4
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

registerServiceWorker();
