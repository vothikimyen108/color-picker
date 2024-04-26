import React, { useEffect, useState } from "react";
import "./GradientColorTool.css";
import ColorInput from "../../common/input/ColorInput.tsx";
import { useColorContext } from "../../ColorContext.tsx";
import { processValue } from "../../common/until.tsx";

type GradientColorToolProps = {};

const GradientColorTool = ({}: GradientColorToolProps) => {
  const { gradient, setGradient } = useColorContext();
  const [deg, setDeg] = useState<number>(gradient.deg);
  const [isBlur, setIsBlur] = useState(false)

  const handleOnChange = (e) => {
    const parsedValue = processValue(e.target.value, 360);
    setDeg(parsedValue);
    setIsBlur(false)
  };
  
  const handleOnBlur = () => {
    if(!deg) {
      setDeg(0)
    }
    setIsBlur(true)
  };

  useEffect(()=> {
    if(isBlur){
      setGradient({ ...gradient, deg: deg });
    }
  }, [setDeg]);

  return (
    <>
      <h3>Gradient</h3>
      <div className="btn-group">
        <div
          className={`btn-gradient ${
            gradient.isLinear ? "btn-gradient-selected" : ""
          }`}
          onClick={() => {
            setGradient({ ...gradient, isLinear: true });
          }}
        >
          <span>Linear</span>
        </div>
        <div
          className={`btn-gradient ${
            !gradient.isLinear ? "btn-gradient-selected" : ""
          }`}
          onClick={() => {
            setGradient({ ...gradient, isLinear: false });
          }}
        >
          <span>Radial</span>
        </div>
      </div>
      {gradient.isLinear && (
          <div className="deg-input">
            <ColorInput
              name="deg"
              value={deg}
              type="number"
              label="deg (0-360)"
              onChange={handleOnChange}
              onBlur={handleOnBlur}
            />
          </div>
        )}
    </>
  );
};

export default GradientColorTool;
