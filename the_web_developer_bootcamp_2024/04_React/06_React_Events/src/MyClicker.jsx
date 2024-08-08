export default function MyClicker({ message, buttonText }) {
  const handleAlert = () => {
    alert(message);
  };
  return <button onClick={() => handleAlert(message)}>{buttonText}</button>;
}
