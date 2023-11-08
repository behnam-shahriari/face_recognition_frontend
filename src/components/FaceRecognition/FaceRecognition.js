const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img src={imageUrl} alt="Face" width="500px" height="Auto" />
      </div>
    </div>
  );
};

export default FaceRecognition;
