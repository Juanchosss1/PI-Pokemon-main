import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      LandingPage
      <Link to="/home">
        <button>Entrar</button>
      </Link>
    </div>
  );
};

export default LandingPage;
