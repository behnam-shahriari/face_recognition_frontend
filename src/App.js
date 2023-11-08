import { Component } from "react";
import "./App.css";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";

class App extends Component {
  constructor() {
    super();
    this.state = {
      particleChangeDuration: 15000,
      particleType: "",
      particleChangeFlag: false,
      particleOptions: [
        "color",
        "circle",
        "cobweb",
        "polygon",
        "square",
        "tadpole",
        "fountain",
      ],
    };
  }

  componentDidMount = () => {
    setTimeout(this.getParticleType, this.state.particleChangeDuration);
  };

  componentDidUpdate = () => {
    const { particleChangeFlag } = this.state;
    if (particleChangeFlag) {
      setTimeout(this.getParticleType, this.state.particleChangeDuration);
    }
  };

  getParticleType = () => {
    const { particleOptions } = this.state;
    this.setState({
      particleType:
        particleOptions[Math.floor(Math.random() * particleOptions.length)],
      particleChangeFlag: true,
    });
  };

  render() {
    const { particleType } = this.state;
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
}

export default App;
