import React, { Component } from "react";
import { gql, withApollo } from "react-apollo";
import Link from "./Link";

class Search extends Component {
  state = {
    links: [],
    searchText: ""
  };

  render() {
    return (
      <div>
        <div>
          Search
          <input
            type="text"
            onChange={e => this.setState({ searchText: e.target.value })}
          />
          <button onClick={() => this._executeSearch()}>OK</button>
        </div>
        {this.state.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
      </div>
    );
  }

  _executeSearch = async () => {
    // ... you'll implement this in a bit
  };
}

export default withApollo(Search);
