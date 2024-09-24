import "./styles.css";
import Greeter from "./Greeter";
import Dog from "./Dog";
import LoginForm from "./LoginForm";
import Die from "./Die";
import DiceRoll from "./DiceRoll";
import RandomPokemon from "./RandomPokemon";

export default function App() {
  return (
    <div className="App">
      {/* <DiceRoll/>
      <DiceRoll/> */}
      <RandomPokemon />
    </div>
  );
}

// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png
