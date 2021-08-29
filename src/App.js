import React, {useState} from 'react';

import Canvas from './components/Canvas';
import Controls from './components/Controls';

function App() {

  let [showMenu, setMenu] = useState(false);
  let [axiom, setAxiom] = useState('F');
  let [sentence, setSentence] = useState(axiom);
  let [numIterations, setIterations] = useState(3);
  let [rule, setRule] = useState("F[&+++F][-----F][^^^^-F][&&&&&F]");
  let [rule2, setRule2] = useState('');
  let [angle, setAngle] = useState(10);
  let [segmentLength, setLength] = useState(3);
  let [segmentRadius, setRadius] = useState(0.18);
  let [lengthModifier, setLengthModifier] = useState(0.6)
  let [radialModifier, setRadialModifier] = useState(0.6);
  let [color, setColor] = useState([100, 85, 75]);
  let [texture, setTexture] = useState(false);
  let [trigger, setTrigger] = useState(true);

  function iterate(n) {
    let curSentence = axiom;
    let newSentence = '';
    for (let i = 1; i <= n; i++) {
      for (let j = 0; j < curSentence.length; j++) {
        if (curSentence[j] === 'F') {
          newSentence += rule;
        } else if (curSentence[j] === 'X') {
          newSentence += rule2;
        } else {
          newSentence += curSentence[j];
        }
      }
      curSentence = newSentence;
      newSentence = '';
    }
    setSentence(curSentence);
    setTrigger(true);
  }

  return (
    <div className="App">
      <Canvas
        sentence={sentence}
        trigger={trigger}
        setTrigger={setTrigger}
        rule={rule}
        angle={angle}
        length={segmentLength}
        radius={segmentRadius}
        lengthModifier={lengthModifier}
        radialModifier={radialModifier}
        color={color}
        texture={texture}
      />
      <Controls
        showMenu={showMenu}
        setMenu={setMenu}
        axiom={axiom}
        setAxiom={setAxiom}
        setSentence={setSentence}
        numIterations={numIterations}
        setIterations={setIterations}
        rule={rule}
        setRule={setRule}
        rule2={rule2}
        setRule2={setRule2}
        angle={angle}
        setAngle={setAngle}
        segmentLength={segmentLength}
        setLength={setLength}
        lengthModifier={lengthModifier}
        setLengthModifier={setLengthModifier}
        segmentRadius={segmentRadius}
        setRadius={setRadius}
        radialModifier={radialModifier}
        setRadialModifier={setRadialModifier}
        iterate={iterate}
        color={color}
        setColor={setColor}
        texture={texture}
        setTexture={setTexture}
      />
    </div>
  );
}

export default App;
