import "../styles/WrongLetters.css";

const WrongLetters = ({ wrongLetters }) => {
  return (
    <div className="wrong-letters-container">
      <div style={{display: "flex", alignItems: "center"}}>
        {wrongLetters.length > 0 && <p>Wrong:&nbsp;</p>}
        {wrongLetters
          .map((letter, index) => <span key={index}>{letter}</span>)
          .reduce(
            (prev, curr) => (prev === null ? [curr] : [prev, ",", curr]),
            null
          )}
      </div>
    </div>
  );
};

export default WrongLetters;
