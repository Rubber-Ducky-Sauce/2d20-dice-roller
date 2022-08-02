import "./App.css";
import ActionRoller from "./components/ActionRoller";
import EffectRoller from "./components/EffectRoller";
import Styled from "styled-components";

function App() {
  //const [effectPool, setEffectPool] = useState([]);
  return (
    <div className="App">
      <DiceContainer>
        <EffectRoller />
        <ActionRoller />
      </DiceContainer>
    </div>
  );
}

export default App;

const DiceContainer = Styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  margin: 5px;
  text-align: center;
`;
