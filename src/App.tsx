import React from "react";
import "./App.css";
import { ColorProvider } from "./ColorContext.tsx";
import GradientColorSection from "./component/GradientColorSection/GradientColorSection.tsx";
import ThemeGradientColor from "./component/GradientColor/ThemeGradientColor.tsx";

function App() {
  const color: Color = {
    hexColor: "#000000",
    hslColor: {
      hue: 0,
      saturation: 0,
      lightness: 0,
    },
    bgColor: "#000000",
    bgColorPicker: {
      hue: 0,
      saturation: 100,
      lightness: 50,
    },
    rgbaColor: {
      r: 0,
      b: 0,
      g: 0,
      a: 1,
    },
  };
  const colorListData: ColorItem[] = [
    { color: color, id: 1, stop: 0, selected: true },
    { color: color, id: 2, stop: 100, selected: false },
    { color: color, id: 3, stop: 100, selected: false },
  ];
  return (
    <ThemeGradientColor singleColor={color} dataList={colorListData}></ThemeGradientColor>
  );
}

export default App;
