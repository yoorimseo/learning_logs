export default function Die() {
  const roll = Math.floor((Math.random() * 6)) + 1;
  return (
    <h2 className="Die">Die Roll: {roll}</h2>
  );
}

