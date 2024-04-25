import React, { useEffect, useLayoutEffect, useState } from "react";
import "./ColorInputRange.css";
import { useColorContext } from "../../ColorContext.tsx";
import styled from "styled-components";
import { HSLToHex, HSLToRGB } from "../../common/until.tsx";

const ColorInputRange = () => {
  const { color, setColor } = useColorContext();
 
  useLayoutEffect(() => {
    document.documentElement.style.setProperty("--hue", "0");
  }, []);
  
  const handleInputChange = (e) => {
    // Update CSS variable using JavaScript
    document.documentElement.style.setProperty("--hue", e.target.value);
    setColor({
      hexColor: HSLToHex(e.target.value, 100, 50),
      hslColor: {
        hue: e.target.value,
        saturation: 100,
        lightness: 50,
      },
      bgColor: HSLToHex(e.target.value, 100, 50),
      bgColorPicker: {
        hue: e.target.value,
        saturation: 100,
        lightness: 50,
      },
      rgbaColor: HSLToRGB(e.target.value, 100, 50),
    });
  };

  return (
    <div className="color-range">
      <input
        type="range"
        id="hslColorId"
        name="hslColor"
        min="0"
        max="360"
        value={color.bgColorPicker.hue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ColorInputRange;
