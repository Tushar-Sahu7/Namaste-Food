import { useState } from "react";

const User = (props) => {
  const { name, location, contact } = props;
  const [count] = useState(0);
  const [count2] = useState(1);
  return (
    <div className="res-container ">
      <div className="res-card about-card">
        <h1>Count: {count}</h1>
        <h1>Count: {count2}</h1>
        <h1>{name}</h1>
        <h4>
          <strong>Location:</strong> {location}
        </h4>
        <h4>
          <strong>Contact:</strong> {contact}
        </h4>
      </div>
    </div>
  );
};

export default User;
