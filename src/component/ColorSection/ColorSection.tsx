import React from "react";
import "./ColorSection.css";
import { useColorContext } from "../../ColorContext.tsx";
import ColorPicker from "../ColorPicker/ColorPicker.tsx";

const ColorSection = () => {
  const { color } = useColorContext();

  return (
    <section className="color-section">
      <div
        className="color-display"
        style={{ backgroundColor: color.bgColor }}
      />
      <div className="color-picker-container">
        <ColorPicker />
      </div>
    </section>
  );
};

export default ColorSection;
