import Tilt from "react-parallax-tilt";
import face from "./face.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma4  br2 shadow-2" style={{ width: "150px" }}>
      <Tilt className="Tilt">
        <div className="pa1">
          <h1>
            <img src={face} style={{ paddingTop: "5px" }} alt="Logo" />{" "}
          </h1>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
