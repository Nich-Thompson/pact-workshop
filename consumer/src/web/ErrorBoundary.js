import React from "react";
import PropTypes from "prop-types";
import Layout from "./Layout";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { has_error: false };
  }

  componentDidCatch() {
    this.setState({ has_error: true });
  }

  render() {
    if (this.state.has_error) {
      return (
        <Layout>
          <h1>Error occurred :/</h1>
          <div className="columns">
            <img
              className="column col-6"
              style={{
                height: "100%",
              }}
              src={"/sad_panda.gif"}
              alt="sad_panda"
            />
            <pre
              className="code column col-6"
              style={{
                wordWrap: "break-word",
              }}
            ></pre>
          </div>
        </Layout>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.object.isRequired,
};
