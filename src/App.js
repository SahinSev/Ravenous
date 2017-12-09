import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Yelp from './util/Yelp.js';
import {BusinessList} from './components/BusinessList/BusinessList';
import {SearchBar} from './components/SearchBar/SearchBar';




class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      businesses: []
    };

    this.searchYelp = this.searchYelp.bind(this);
  }

  searchYelp(term, location, sortBy) {
    Yelp.search(term, location, sortBy).then(businesses => {
      this.setState({businesses: businesses});
    });
  }
    //console.log(`Searching Yelp for ${term}, in ${location}, by ${sortBy}`);
  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp = {this.searchYelp} />
        <BusinessList businesses={this.state.businesses} />
      </div>
    );
  }
}

export default App;