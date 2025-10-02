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
        <h1 className="font-heading-1 text-2xl text-center m-4 capitalize">About Class Component</h1>
        <div className="m-4 text-center">
          LoggedIn User{" "}
          <UserContext.Consumer>
            {({ loggedInUser }) => <h1>{loggedInUser}</h1>}
          </UserContext.Consumer>
        </div>
        <h2>This is Namaste React Web Series</h2>
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
