import React from "react";
import GradientColorList from "../GradientColorList/GradientColorList.tsx";
import { useColorContext } from "../../ColorContext.tsx";
import "./GradientColorSection.css";
import GradientColorTool from "../GradientColorTool/GradientColorTool.tsx";
import ThemeColor from "../SingleColor/ThemeColor.tsx";
import ColorInputRange from "../HSLColorRange/ColorInputRange.tsx";
import HEXColorInput from "../HEXColor/HEXColorInput.tsx";
import RGBAInput from "../RGBAColor/RGBAInput.tsx";

const GradientColorSection = () => {
  const { background } = useColorContext();

  return (
    <>
      <div className="gradient-color-container">
        <div
          className="gradient-color"
          style={{ background: background }}
        ></div>
        <div className="gradient-color-section">
          <div className="gradient-color-section-left">
            <div>
              <h3>Color Picker</h3>
            </div>
            <ThemeColor />
            <div className="color-input-range">
              <ColorInputRange />
            </div>
          </div>
          <div className="gradient-color-section-middle">
            <div>
              <h3>Color code</h3>
            </div>
            <div className="colorPicker-input">
              <div className="hex-color-input">
                <HEXColorInput />
              </div>
              <RGBAInput />
            </div>
            <GradientColorTool />
          </div>
          <div className="gradient-color-section-right">
            <GradientColorList />
          </div>
        </div>
        <div className="gradient-color-code">
          <span className="text-bg-code">background: </span>
          {background}
        </div>
      </div>
    </>
  );
};

export default GradientColorSection;
