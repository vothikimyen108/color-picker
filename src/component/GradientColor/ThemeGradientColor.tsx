import React from "react";
import { ColorProvider } from "../../ColorContext.tsx";
import GradientColorSection from "../GradientColorSection/GradientColorSection.tsx";

type ColorProviderProps = {
    singleColor: Color;
    dataList: ColorItem[];
  };

const ThemeGradientColor: React.FC<ColorProviderProps> = ({singleColor, dataList}) => {
  return (
    <ColorProvider singleColor={singleColor} dataList={dataList}>
      <GradientColorSection />
    </ColorProvider>
  );
};

export default ThemeGradientColor;
