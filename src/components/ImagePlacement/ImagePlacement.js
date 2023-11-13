import "./ImagePlacement.css";

const ImagePlacement = ({ imageUrl, box, boxClaculated }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          src={imageUrl}
          id="inputimage"
          alt="Face"
          width="500px"
          height="Auto"
        />
        {boxClaculated &&
          box.map((b, i) => (
            <div
              key={i}
              className="bounding-box"
              style={{
                top: box[i].topRow,
                right: box[i].rightCol,
                bottom: box[i].bottomRow,
                left: box[i].leftCol,
              }}
            ></div>
          ))}
      </div>
    </div>
  );
};

export default ImagePlacement;
