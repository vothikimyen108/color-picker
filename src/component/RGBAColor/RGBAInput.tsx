import React, { useEffect, useState } from "react";
import ColorInput from "../../common/input/ColorInput.tsx"; // Update import path without ".tsx"
import "./RGBAInput.css";
import { useColorContext } from "../../ColorContext.tsx"; // Update import path without ".tsx"
import { RGBToHSL, RGBToHex, processValue, processValueA } from "../../common/until.tsx"; // Update import path without ".tsx"


const RGBAInput = () => {
  const { color, setColor } = useColorContext();
  const [colorValues, setColorValues] = useState(color.rgbaColor);
  const [isBlur, setIsBlur] = useState(false);

  useEffect(() => {
    setColorValues(color.rgbaColor);
  }, [color]);

  const handleColorChange = (name, value) => {
    setColorValues((prevColorValues) => ({
      ...prevColorValues,
      [name]: value,
    }));
  };

  const handleInputChange = (name, value) => {
    setIsBlur(false);
    if (name === "a") {
      let parsedValue = processValueA(value, 0, 1);
      handleColorChange(name, parsedValue);
    } else {
      let parsedValue = processValue(value, 255);
      handleColorChange(name, parsedValue);
    }
  };

  const handleOnBlur = () => {
    setIsBlur(true);
    if (!colorValues.a) {
      handleColorChange("a", 0);
    }
    if (!colorValues.r) {
      handleColorChange("r", 0);
    }
    if (!colorValues.g) {
      handleColorChange("g", 0);
    }
    if (!colorValues.b) {
      handleColorChange("b", 1);
    }
  };
  useEffect(() => {
    if (isBlur) {
      const updatedColor = {
        ...color,
        rgbaColor: colorValues,
        hexColor: RGBToHex(colorValues),
        hslColor: RGBToHSL(colorValues),
        bgColor: RGBToHex(colorValues),
        bgColorPicker: {
          ...RGBToHSL(colorValues),
          saturation: 100,
          lightness: 50,
        },
      };
      setColor(updatedColor);
    }
  }, [colorValues, isBlur]);
  return (
    <div className="rgba-input">
      <div>
        <ColorInput
          name="r"
          value={colorValues.r}
          label="R"
          type="number"
          min={0}
          max={255}
          onChange={(event) => handleInputChange("r", event.target.value)}
          onBlur={handleOnBlur}
        />
      </div>
      <div>
        <ColorInput
          name="g"
          value={colorValues.g}
          label="G"
          type="number"
          min={0}
          max={255}
          onChange={(event) => handleInputChange("g", event.target.value)}
          onBlur={handleOnBlur}
        />
      </div>
      <div>
        <ColorInput
          name="b"
          value={colorValues.b}
          label="B"
          type="number"
          min={0}
          max={255}
          onChange={(event) => handleInputChange("b", event.target.value)}
          onBlur={handleOnBlur}
        />
      </div>
      <div>
        <ColorInput
          name="a"
          value={colorValues.a}
          label="A"
          type="number"
          min={0}
          max={1}
          onChange={(event) => handleInputChange("a", event.target.value)}
          onBlur={handleOnBlur}
        />
      </div>
    </div>
  );
};

export default RGBAInput;
