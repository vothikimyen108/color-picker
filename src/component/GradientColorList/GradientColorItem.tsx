import React, { ChangeEvent, useEffect, useState } from "react";
import "./GradientColorItem.css";
import ColorInput from "../../common/input/ColorInput.tsx";
import { useColorContext } from "../../ColorContext.tsx";
import {
  HexToHSL,
  handleColorInput,
  hexToRGBA,
  processValue,
} from "../../common/until.tsx";

type GradientColorProps = {
  colorItem: ColorItem;
  onChangeStop: (num: number, item: ColorItem) => void;
};

const GradientColorItem = ({ colorItem, onChangeStop }: GradientColorProps) => {
  const { setColor ,gradient } = useColorContext();
  const [hexColor, setHexColor] = useState<string>(colorItem.color.hexColor);
  const [stop, setStop] = useState<number>(colorItem.stop || 0);
  const [error, setError] = useState<string | null>(null);
  const [isBlur, setIsBlur] = useState(false);
 

  useEffect(() => {
    setHexColor(colorItem.color.hexColor);
  }, [colorItem.color.hexColor]);

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

  const handleStopInput = (event) => {
    const parsedValue = processValue(event.target.value, 100);
    setStop(parsedValue);
    setIsBlur(false)
  };

  const handleOnBlurStop = () => {
    setIsBlur(true);
    if (!stop) {
      setStop(0);
    }
  };

  useEffect(() => {
    if (isBlur) {
      onChangeStop(stop, colorItem);
    }
  }, [isBlur]);

  useEffect(() => {
    setStop(colorItem.stop);
  }, [colorItem]);

  return (
    <div className={`color-item ${colorItem.selected ? "color-selected" : ""}`}>
      <div className="color-item-id">
        <h6>{colorItem.id}</h6>
      </div>
      <div
        className="color-item-bg"
        style={{ backgroundColor: colorItem.color.bgColor }}
      ></div>
      <div className="color-item-code">
        <ColorInput
          name="color-code"
          value={hexColor}
          onChange={handleHexInput}
          onBlur={handleOnBlur}
          err={error || ""}
        />
      </div>
      <div className="color-item-stop">
        <ColorInput
          name="stop"
          value={stop}
          type="number"
          onChange={handleStopInput}
          onBlur={handleOnBlurStop}
        />

      </div>
    </div>
  );
};

export default GradientColorItem;
