import { createContext } from "react";

const UserContext = createContext({
  loggedInUser: "User",
});

export default UserContext;
