import { useEffect, useState } from "react";
import Styled from "styled-components";

const Dice = ({ roll, result, index }) => {
  const [dice, setDice] = useState(result);

  useEffect(() => {
    setDice(result);
  }, [result]);

  const handleRoll = () => {
    setDice(roll(index));
  };

  return <EffectStyle onClick={handleRoll}>{dice}</EffectStyle>;
};
export default Dice;

const EffectStyle = Styled.button`
    background-color: green;
`;
