import React, {Component} from "react";
import { Route } from 'react-router-dom';
import HomePage from "./pages/homepage";
import FormPage from "./pages/formpage";
import ProductPage from "./pages/productpage";
import Navbar from "./components/navbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  render() {
    return (
        <div>
          <Navbar />
          <Route path="/" component={HomePage} exact />
          <Route path="/form" component={FormPage} />
          <Route path="/product" component={ProductPage} />
        </div>
    );
  }
}

export default App;
