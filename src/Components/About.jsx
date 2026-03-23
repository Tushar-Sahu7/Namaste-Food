import UserContext from "../Utils/userContext";
import UserClass from "./UserClass";
import { Component } from "react";

class About extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  componentWillUnmount() {}

  render() {
    return (
      <div className="flex flex-wrap flex-col items-center justify-center m-4 p-4">
        <div className="m-4 text-center">
          Logged In User{" "}
          <UserContext.Consumer>
            {({ loggedInUser }) => <h1>{loggedInUser}</h1>}
          </UserContext.Consumer>
        </div>
        <UserClass
          name={"Tushar Sahu(class)"}
          location={"Jaunpur"}
          contact={"@tushar-sahu7"}
        />
      </div>
    );
  }
}

export default About;
