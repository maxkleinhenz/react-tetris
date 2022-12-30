type Props = {
  points: number;
  linesCleared: number;
};

const pad = (n: number) => {
  let str = n.toString();
  const count = 4 - str.length;
  for (let i = 0; i < count; i++) {
    str = `0${str}`;
  }
  str = str.split("").join(" ");
  return str;
};

const Score = (props: Props): JSX.Element => {
  const pointsStr = pad(props.points);
  const linesClearedStr = pad(props.linesCleared);

  return (
    <div className="grid grid-cols-2 my-2 font-mono text-center text-slate-700 dark:text-slate-300">
      <p className="m-0">
        points
        <br />
        <span className="text-xl">{pointsStr}</span>
      </p>
      <p className="m-0">
        lines
        <br />
        <span className="text-xl">{linesClearedStr}</span>
      </p>
    </div>
  );
};

export default Score;
