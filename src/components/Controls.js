import React from 'react';

function Controls(props) {

  function setAngle(val) {
    if (!isNaN(parseInt(val)) && val > 0 && val < 360) {
      props.setAngle(parseInt(val));
    }
  }

  function setLength(val) {
    if (!isNaN(parseInt(val)) && val >= 0.5 && val <= 4) {
      props.setLength(val);
    } else {
      if (isNaN(parseInt(val))) {
        props.setLength(2);
      } else {
        if (val > 4) {
          props.setLength(4);
        } else {
          props.setLength(0.5);
        }
      }
    }
  }

  function modifier(property, val, lowerLimit, upperLimit) {
    if (!isNaN(parseInt(val)) && val >= lowerLimit && val < upperLimit && val !== '') {
      if (property === 'length') {
        props.setLengthModifier(val);
      } else {
        props.setRadialModifier(val);
      }
    } else {
      if (property === 'length') {
        if (val > upperLimit) {
          props.setLengthModifier(upperLimit);
        } else {
          props.setLengthModifier(lowerLimit);
        }
      } else {
        if (val > upperLimit) {
          props.setRadialModifier(upperLimit);
        } else {
          props.setRadialModifier(lowerLimit);
        }
      }
    }
  }

  function setRadius(val) {
    if (!isNaN(parseInt(val)) && val >= 0.05 && val <= 0.5) {
      props.setRadius(val);
    } else {
      if (isNaN(parseInt(val))) {
        props.setRadius(0.1);
      } else {
        if (val > 0.5) {
          props.setRadius(0.5);
        } else {
          props.setRadius(0.05);
        }
      }
    }
  }

  function setIterations(val) {
    if (!isNaN(parseInt(val)) && val > 0 && val < 5) {
      props.setIterations(val);
    }
  }

  function setColor(val, ind) {
    if (!isNaN(parseInt(val)) && val >= 0 && val < 256) {
      let newColor = [...props.color];
      newColor[ind] = Math.floor(val);
      props.setColor(newColor);
    }
  }

  function toggleTexture() {
    props.setTexture(!props.texture);
  }

  if (props.showMenu) {
    return (
      <div id="controls">
      <div className="control-item">
        <p>Show Help Menu:</p>
         <input type="checkbox" checked={props.showMenu} onChange={() => props.setMenu(!props.showMenu)} />
      </div>
        <div className="menu-item"><p><strong>Mousewheel</strong> or <strong>pinch</strong> to zoom camera</p></div>
        <div className="menu-item"><p><strong>Click and drag</strong> or <strong>touch and drag</strong> to rotate camera</p></div>
        <div className="menu-item"><p><strong>Right click and drag</strong> or <strong>two-finger touch and drag</strong> to pan camera</p></div>
        <div className="menu-item"><p className="menu-key">' F ':</p><p>Draw</p></div>
        <div className="menu-item"><p className="menu-key">' X ':</p><p>Placeholder value</p></div>
        <div className="menu-item"><p className="menu-key">' + ':</p><p>Counterclockwise Z axis rotation</p></div>
        <div className="menu-item"><p className="menu-key">' - ':</p><p>Clockwise Z axis rotation</p></div>
        <div className="menu-item"><p className="menu-key">' ^ ':</p><p>Counterclockwise  X axis rotation</p></div>
        <div className="menu-item"><p className="menu-key">' & ':</p><p>Clockwise X axis rotation</p></div>
        <div className="menu-item"><p className="menu-key">' &lt; ':</p><p>Counterclockwise Y axis rotation</p></div>
        <div className="menu-item"><p className="menu-key">' &gt; ':</p><p>Clockwise Y axis rotation</p></div>
        <div className="menu-item"><p className="menu-key">' [ ':</p><p>Start branch</p></div>
        <div className="menu-item"><p className="menu-key">' ] ':</p><p>End branch</p></div>
      </div>
    )
  } else {
    return (
      <div id="controls">
      <div className="control-item">
        <p>Show Help Menu:</p>
         <input type="checkbox" checked={props.showMenu} onChange={() => props.setMenu(!props.showMenu)} />
      </div>
        <div className="control-item">
          <p>Axiom:</p>
           <input type="text" value={props.axiom} onChange={(e) => {
             props.setAxiom(e.target.value);
             props.setSentence(e.target.value);
           }} />
        </div>
        <div className="control-item">
            <p>Rule:</p>
            <div className="rule-item">
              <p>F = </p>
              <input type="text" value={props.rule} onChange={(e) => props.setRule(e.target.value)} />
           </div>
        </div>
        <div className="control-item">
          <p>Rule 2:</p>
            <div className="rule-item">
              <p>X = </p>
              <input type="text" value={props.rule2} onChange={(e) => props.setRule2(e.target.value)} />
            </div>
        </div>
        <div className="control-item">
          <p>Angle:</p>
          <input type="text" value={props.angle} onChange={(e) => setAngle(e.target.value)} />
        </div>
        <div className="control-item">
          <p>Segment Length:</p>
          <input type="text" value={props.segmentLength} onChange={(e) => setLength(e.target.value)} />
        </div>
        <div className="control-item">
          <p>Length Modifier:</p>
          <input type="text" value={props.lengthModifier} onChange={(e) => modifier('length', e.target.value, 0.5, 2)} />
        </div>
        <div className="control-item">
          <p>Segment Radius:</p>
          <input type="text" value={props.segmentRadius} onChange={(e) => setRadius(e.target.value)} />
        </div>
        <div className="control-item">
          <p>Radial Modifier:</p>
          <input type="text" value={props.radialModifier} onChange={(e) => modifier('radius', e.target.value, 0.4, 1.4)} />
        </div>
        <div className="control-item">
          <p>Iterations:</p>
          <input type="text" value={props.numIterations} onChange={(e) => setIterations(parseInt(e.target.value))} />
        </div>
        <div className="control-item">
          <div id="color-labels">
            <p className="color-label">Red:</p>
            <p className="color-label">Green:</p>
            <p className="color-label">Blue:</p>
          </div>
          <div id="color-controls">
            <div id="color-pickers">
              <input type="text" className="color-picker" value={props.color[0]} onChange={(e) => setColor(e.target.value, 0)} />
              <input type="text" className="color-picker" value={props.color[1]} onChange={(e) => setColor(e.target.value, 1)} />
              <input type="text" className="color-picker" value={props.color[2]} onChange={(e) => setColor(e.target.value, 2)} />
            </div>
            <div id="color-preview" style={{backgroundColor: `rgb(${props.color[0]}, ${props.color[1]}, ${props.color[2]})`}}></div>
          </div>
        </div>
        <div className="control-item">
          <p>Textured:</p><input type="checkbox" checked={props.texture} onChange={toggleTexture} />
        </div>
        <div className="control-item">
          <button onClick={() => props.iterate(props.numIterations)}>Generate</button>
        </div>
      </div>
    )
  }

}

export default Controls;
