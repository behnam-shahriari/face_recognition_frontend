import { Component } from "react";
import "./App.css";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import GeneralImageRecognition from "./components/GeneralImageRecognition/GeneralImageRecognition";
import ImagePlacement from "./components/ImagePlacement/ImagePlacement";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

const initialState = {
  // Particles
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
  // Model
  typeId: "fr", // Face Recognition
  // Others
  input: "",
  imageUrl: "",
  box: [],
  boxClaculated: false,
  generalImageOptions: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
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

  loadUser = (data) => {
    this.setState({
      ...this.state.user,
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  getParticleType = () => {
    const { particleOptions } = this.state;
    this.setState({
      particleType:
        particleOptions[Math.floor(Math.random() * particleOptions.length)],
      particleChangeFlag: true,
    });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.state.box.push(box);
  };

  detectedObjects = (item) => {
    this.state.generalImageOptions.push(item?.name);
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    const { input, typeId } = this.state;
    this.setState({
      imageUrl: input,
      box: [],
      boxClaculated: false,
      generalImageOptions: [],
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, user and app ID, model details, and the URL
    // of the image we want as an input. Change these strings to run your own example.
    //////////////////////////////////////////////////////////////////////////////////////////////////

    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = "7a642105b2214d968da39d8e956b3914";
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = "clarifai";
    const APP_ID = "main";
    // Change these to whatever model and image URL you want to use
    const MODEL_ID =
      typeId === "fr"
        ? "face-detection"
        : typeId === "gir"
        ? "general-image-recognition"
        : "";
    const MODEL_VERSION_ID =
      typeId === "fr"
        ? "6dc7e46bc9124c5c8824be4822abe105"
        : typeId === "gir"
        ? "aa7f35c01e0642fda5cf400f543e7c40"
        : "";
    const IMAGE_URL = input;

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch(
      "https://api.clarifai.com/v2/models/" +
        MODEL_ID +
        "/versions/" +
        MODEL_VERSION_ID +
        "/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          fetch("http://localhost:3000/image", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) =>
              this.setState({
                user: {
                  ...this.state.user,
                  entries: count,
                },
              })
            );
        }
        const response =
          typeId === "fr"
            ? result?.outputs[0]?.data?.regions?.map((boundry) => {
                return this.displayFaceBox(this.calculateFaceLocation(boundry));
              })
            : typeId === "gir"
            ? result?.outputs[0]?.data?.concepts?.map((option) =>
                this.detectedObjects(option)
              )
            : "";

        return response;
      })
      .catch((error) => console.log("error", error))
      .finally(() => this.setState({ boxClaculated: true }));
  };

  onTypeChange = (event) => {
    this.setState({ typeId: event.target.value });
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({
        isSignedIn: true,
      });
    }
    this.setState({
      route: route,
    });
  };

  render() {
    const {
      particleType,
      imageUrl,
      box,
      boxClaculated,
      typeId,
      generalImageOptions,
      route,
      isSignedIn,
    } = this.state;

    return (
      <div className="App">
        <ParticlesBg className="particles" type={particleType} bg={true} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        {route === "home" ? (
          <>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
              onTypeChange={this.onTypeChange}
            />

            {imageUrl && (
              <ImagePlacement
                imageUrl={imageUrl}
                box={box}
                boxClaculated={boxClaculated}
              />
            )}
            {typeId === "gir" &&
              imageUrl &&
              generalImageOptions?.length > 0 && (
                <row>
                  <GeneralImageRecognition
                    imageUrl={imageUrl}
                    options={generalImageOptions}
                  />
                </row>
              )}
          </>
        ) : route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
