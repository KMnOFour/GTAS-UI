
import React from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <div>{this.props.message}</div>;
      // return fallback component. Do we need this??
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  message: PropTypes.string
};

export default ErrorBoundary;
