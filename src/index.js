import React from "react";
import Layout from "./containers/Layout/Layout";

function App(props) {
  return (
    <div>
      <Layout urls={props.urls} />
    </div>
  );
}

export default App;
