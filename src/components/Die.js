const Die = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`die ${props.isHeld ? "active" : ""}`}
    >
      {props.value}
    </div>
  );
};

export default Die;
