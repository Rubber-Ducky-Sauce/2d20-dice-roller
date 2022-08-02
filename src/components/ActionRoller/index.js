import { useEffect, useCallback, useState } from "react";
import Dice from "../Dice";
import Styled from "styled-components";

const ActionRoller = () => {
  const [ActionPool, setActionPool] = useState([]);
  const [ActionToRoll, setActionToRoll] = useState(1);
  const [successes, setSuccesses] = useState(0);
  const [TN, setTN] = useState(1);
  const [focus, setFocus] = useState(0);

  //singular roll function sent to each die
  const roll = useCallback(
    (index) => {
      const roll = Math.floor(Math.random() * 20 + 1);
      setActionPool(() =>
        ActionPool.map((item, idx) => (idx === index ? roll : item))
      );
      return roll;
    },
    [setActionPool, ActionPool]
  );

  //changes
  const handleChange = (e) => {
    setActionToRoll(e.target.value);
  };

  const handleTN = (e) => {
    setTN(e.target.value);
  };

  const handleFocus = (e) => {
    setFocus(e.target.value);
  };

  const countSuccess = useCallback(
    (array) => {
      let result = 0;

      array.forEach((num) => {
        if (num <= TN) result++;
        if (num <= focus) result++;
      });
      setSuccesses(result);
    },
    [setSuccesses, TN, focus]
  );

  const rollActionDice = () => {
    const array = [];
    for (let i = 0; i < ActionToRoll; i++) {
      array.push(roll());
    }
    setActionPool(array);
    countSuccess(array);
  };

  useEffect(() => {
    countSuccess(ActionPool);
  }, [ActionPool, countSuccess]);

  return (
    <ActionStyle>
      <h1>Action Dice</h1>
      <label>
        number of dice
        <input
          type="range"
          min="1"
          max="5"
          value={ActionToRoll}
          onChange={handleChange}
        />
        <p>{ActionToRoll}</p>
      </label>
      <label>
        target number
        <input type="number" min="0" value={TN} onChange={handleTN} />
      </label>
      <label>
        focus
        <input
          type="range"
          min="0"
          max="5"
          value={focus}
          onChange={handleFocus}
        />
        <p>{focus}</p>
      </label>
      <button className="roller-btn" onClick={rollActionDice}>
        roll Action
      </button>
      <div>
        {ActionPool.length > 0 &&
          ActionPool.map((num, index) => {
            return <Dice key={index} index={index} roll={roll} result={num} />;
          })}
      </div>
      <p>{`Successes: ${successes}`}</p>
    </ActionStyle>
  );
};
export default ActionRoller;

//todo: include input for tn
//todo: include input for focus

const ActionStyle = Styled.div`
    display:flex;
    flex-direction: column;
    width:50%;
    border: 5px solid red;
    margin: 5px;
    .roller-btn{
        align-self:center;
        width:300px;
    }
`;
