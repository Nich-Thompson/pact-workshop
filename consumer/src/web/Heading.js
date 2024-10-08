import React from 'react';

function Heading() {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h1 style={{ margin: "0px 20px 0px 0px" }}>
          <a href="/" style={{ color: "#635e5e" }}>
            Products
          </a>
        </h1>
        
        <h1 style={{ margin: "0px 20px 0px 0px" }}>
          <a href="/img/1" style={{ color: "#635e5e" }}>
            Images
          </a>
        </h1>
      </div>
      <hr/>
    </div>
  );
}

export default Heading;