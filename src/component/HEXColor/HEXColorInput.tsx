import React, { ChangeEvent, useEffect, useState } from "react";
import ColorInput from "../../common/input/ColorInput.tsx";
import { HexToHSL, handleColorInput, hexToRGBA } from "../../common/until.tsx";
import { useColorContext } from "../../ColorContext.tsx";

const HEXColorInput = () => {
  const { color, setColor } = useColorContext();
  const [hexColor, setHexColor] = useState<string>(color.hexColor);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setHexColor(color.hexColor);
  }, [color.hexColor]);

  const handleHexInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setHexColor(value);
    setError(null);
  };

  const handleOnBlur = () => {
    const { hexValue, error } = handleColorInput(hexColor);

    if (hexValue) {
      setColorFromHex(hexValue);
    }

    setError(error || null);
  };

  const setColorFromHex = (hexValue: string) => {
    const newColor = {
      hexColor: hexValue,
      bgColor: hexValue,
      hslColor: HexToHSL(hexValue),
      bgColorPicker: { ...HexToHSL(hexValue), saturation: 100, lightness: 50 },
      rgbaColor: hexToRGBA(hexValue, 1),
    };

    setColor(newColor);
    setHexColor(hexValue);
  };

  return (
    <ColorInput
      name="hexcolor"
      value={hexColor}
      label="Hex color"
      onChange={handleHexInput}
      onBlur={handleOnBlur}
      err={error || ""}
    />
  );
};

export default HEXColorInput;
