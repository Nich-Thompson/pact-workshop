import React from 'react';
import PropTypes from 'prop-types';
import Heading from './Heading';

function Layout(props) {
  return (
    <div className="container">
      <div className="columns">
        <div className="column col-8 col-mx-auto">
          <Heading />
          {props.children}
        </div>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.elementType.isRequired
};

export default Layout;