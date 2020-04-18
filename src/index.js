import React from "react";
import Layout from "./containers/Layout/Layout";

function App(props) {
  return (
    <div>
      <Layout
        baseUrl={props.baseUrl}
        fileBasePath={props.fileBasePath}
        getFiles={props.getFiles}
        fetchAPI={props.fetchAPI}
      />
    </div>
  );
}

export default App;
