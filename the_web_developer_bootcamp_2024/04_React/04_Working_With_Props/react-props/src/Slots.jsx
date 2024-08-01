export default function Slots({ val1, val2, val3 }) {
  const result = val1 === val2 && val1 === val3;

  return (
    <>
      <h1>
        {val1}
        {val2}
        {val3}
      </h1>
      <h2 style={{ color: result ? 'green' : 'red' }}>{result ? 'You win!' : 'You lose'}</h2>
      {result && <h3>Congrets!!!</h3>}
    </>
  );
}
