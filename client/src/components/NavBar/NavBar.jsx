import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
  return (
    <div>
      NavBar
      <SearchBar />
      <Link to="/home">Home</Link>
    </div>
  );
};

export default NavBar;
