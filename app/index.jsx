import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Loading from "./components/Loading";

const Popular = React.lazy(()=> import("./components/Popular"));
const Battle = React.lazy(()=> import("./components/Battle"));
const Results = React.lazy(()=> import("./components/Results"));

class App extends React.Component {
  state = {
    theme: "light",
  };

  toggleTheme = () => {
    this.setState(({ theme }) => ({
      theme: theme === "light" ? "dark" : "light",
    }));
  }

  render() {
    const { theme } = this.state;
    return (
      <Router>
        <div className={theme}>
          <div className="container">
            <Nav theme={theme} toggleTheme={this.toggleTheme}/>
            <React.Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Popular />} />
                <Route path="/battle" element={<Battle />} />
                <Route path="/results" element={<Results />} />
              </Routes>
            </React.Suspense>
          </div>
        </div>
      </Router>
    );
  }
}

const rootElement = document.getElementById("app");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
