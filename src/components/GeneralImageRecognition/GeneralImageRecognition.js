import "./Style.css";

const GenealImageRecognition = ({ options }) => {
  const heightOfImage = document.getElementById("inputimage").clientHeight + 20;

  return (
    <div
      style={{
        marginTop: `${heightOfImage}px`,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <article className="pa3 pa5-ns">
        <h1 className="f4 bold center mw6">Detected Items:</h1>
        <ul className="list pl0 ml0 mw6 ba b--light-silver br2">
          {options.map((item, i) => {
            return (
              <li key={i} className="ph3 pv3 bb b--light-silver">
                <strong>{item}</strong>
              </li>
            );
          })}
        </ul>
      </article>
    </div>
  );
};

export default GenealImageRecognition;
