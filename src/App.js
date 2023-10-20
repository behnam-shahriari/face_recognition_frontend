import "./App.css";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";

function App() {
  const particleOptions = [
    "color",
    "circle",
    "cobweb",
    "polygon",
    "square",
    "tadpole",
    "fountain",
  ];

  return (
    <div className="App">
      <ParticlesBg
        className="particles"
        type={
          particleOptions[Math.floor(Math.random() * particleOptions.length)]
        }
        bg={true}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />

      {/*<FaceRecognition /> */}
    </div>
  );
}

export default App;
