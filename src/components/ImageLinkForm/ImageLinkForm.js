import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit, onTypeChange }) => {
  return (
    <div>
      <p className="f3">
        {"This Magic Brain will detect everything in your pictures."}
      </p>
      <div className="center">
        <div className="form center pa4 br-3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
          {/* <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onButtonSubmit}
          >
            Detect
          </button> */}
          <select
            id="types"
            className="w-50 db mt1 ml2 h2 f6 bg-near-white ba b--sliver gray"
            name=""
            onChange={onTypeChange}
          >
            <option label="Face Recognition" value="fr"></option>
            <option label="General Item Recognition" value="gir"></option>
            {/* <option label="Food Item Recognition" value="fir"></option>
            <option label="Gender Recognition" value="gr"></option> */}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
