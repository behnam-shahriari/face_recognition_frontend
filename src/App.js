import { useEffect, useState } from "react";
import "./App.css";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";

function App() {
  const [particleType, setParticleType] = useState("");
  const particleOptions = [
    "color",
    "circle",
    "cobweb",
    "polygon",
    "square",
    "tadpole",
    "fountain",
  ];

  useEffect(() => {
    setTimeout(getParticleType, 15000);
  }, [particleType]);

  const getParticleType = () => {
    setParticleType(
      particleOptions[Math.floor(Math.random() * particleOptions.length)]
    );
  };

  return (
    <div className="App">
      <ParticlesBg className="particles" type={particleType} bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />

      {/*<FaceRecognition /> */}
    </div>
  );
}

export default App;
