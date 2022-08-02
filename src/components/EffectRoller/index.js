import { useCallback, useEffect, useState } from "react";
import Dice from "../Dice";
import Styled from "styled-components";

const EffectRoller = () => {
  const [effectPool, setEffectPool] = useState([]);
  const [effectToRoll, setEffectToRoll] = useState(1);
  const [total, setTotal] = useState({ count: 0, effects: 0 });

  //singular roll function sent to each die
  const roll = useCallback(
    (index) => {
      const roll = Math.floor(Math.random() * 6 + 1);
      setEffectPool(() =>
        effectPool.map((item, idx) => (idx === index ? roll : item))
      );
      return roll;
    },
    [setEffectPool, effectPool]
  );

  //changes
  const handleChange = (e) => {
    setEffectToRoll(e.target.value);
  };

  //sums dmg and effect totals
  const countTotals = useCallback(
    (array) => {
      let result = 0;
      let fx = 0;
      array.forEach((num) => {
        if (num === 1 || num === 2) {
          result += num;
        }
        if (num === 6) fx++;
      });
      setTotal({ count: result, effects: fx });
    },
    [setTotal]
  );

  //rolls given number of dice
  const rollEffectDice = () => {
    setTotal({ count: 0, effects: 0 });
    const array = [];
    for (let i = 0; i < effectToRoll; i++) {
      array.push(roll());
    }
    setEffectPool(array);
    countTotals(array);
  };

  useEffect(() => {
    countTotals(effectPool);
  }, [effectPool, countTotals]);

  return (
    <EffectStyle>
      <h1>Effect Dice</h1>
      <label>
        number of dice
        <input
          type="range"
          min="1"
          max="16"
          value={effectToRoll}
          onChange={handleChange}
        />
        <p>{effectToRoll}</p>
      </label>

      <button className="roller-btn" onClick={rollEffectDice}>
        roll effect
      </button>
      <div>
        {effectPool.length > 0 &&
          effectPool.map((num, index) => {
            return <Dice key={index} index={index} roll={roll} result={num} />;
          })}
      </div>
      <p>{`Damage: ${total.count}, FX: ${total.effects} `}</p>
    </EffectStyle>
  );
};
export default EffectRoller;

const EffectStyle = Styled.div`
    display:flex;
    flex-direction: column;
    justify-content:center;
    width:50%;
    border: 5px solid red;
    margin: 5px;
    .roller-btn{
        align-self:center;
        width:300px;
    }
`;
