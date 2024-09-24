import Clicker from './Clicker';
import MyClicker from './MyClicker';
import './App.css';

function App() {
  return (
    <div>
      {/* <Clicker />
      <Clicker /> */}

      <MyClicker
        message='HI!!!!'
        buttonText='Please Click Me'
      />
      <MyClicker
        message='Please Stop Clicking Me!'
        buttonText='do not click'
      />
    </div>
  );
}

export default App;
