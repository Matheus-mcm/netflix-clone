import React from "react";
import { LinkedIn, Instagram } from "@mui/icons-material";
import "./Footer.css";

export default () => {
  return (
    <footer className="footer">
      <p>Feito por: Matheus Cardoso</p>
      <div className="icons">
        <a href="https://www.linkedin.com/in/matheus-cardoso-/" target="_blank">
          <LinkedIn />
        </a>
        <a href="https://www.instagram.com/m_carrdoso/" target="_blank">
          <Instagram />
        </a>
      </div>
    </footer>
  );
};
