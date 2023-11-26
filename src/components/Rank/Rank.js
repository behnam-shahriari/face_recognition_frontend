const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className="white f3">
        {`${name}, You have submitted ${entries} photos.`}
        {/* <span className="white f1">{"#6"}</span> */}
      </div>
    </div>
  );
};

export default Rank;
