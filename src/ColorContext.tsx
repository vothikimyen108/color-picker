import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { listColorToText } from "./common/until.tsx";

type ColorContextType = {
  color: Color;
  listColor: ColorItem[];
  gradient: GradientTool;
  background: string;
  setColor: React.Dispatch<React.SetStateAction<Color>>;
  setListColor: React.Dispatch<React.SetStateAction<ColorItem[]>>;
  setGradient: React.Dispatch<React.SetStateAction<GradientTool>>;
  setBackground: React.Dispatch<React.SetStateAction<string>>;
};

type ColorProviderProps = {
  children: ReactNode;
  singleColor: Color;
  dataList: ColorItem[];
};

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider: React.FC<ColorProviderProps> = ({
  children,
  singleColor,
  dataList,
}) => {
  const [color, setColor] = useState<Color>(singleColor);
  const [listColor, setListColor] = useState<ColorItem[]>(dataList || []);
  const [gradient, setGradient] = useState<GradientTool>({
    isLinear: true,
    deg: 0,
  });
  const deg = `${gradient.deg}deg`;
  const [background, setBackground] = useState<string>(
    `${gradient.isLinear ? "linear" : "radial"}-gradient(${
      gradient.isLinear ? deg : "circle"
    }, ${listColorToText(listColor)})`
  );

  useEffect(() => {
    const deg = `${gradient.deg}deg`;
    setBackground(
      `${gradient.isLinear ? "linear" : "radial"}-gradient(${
        gradient.isLinear ? deg : "circle"
      }, ${listColorToText(listColor)})`
    );
  }, [listColor, gradient]);

  useEffect(() => {
    const newList = listColor.map((item) => {
      return { ...item, color: item.selected ? color : item.color };
    });
    setListColor(newList);
  }, [color]);

  return (
    <ColorContext.Provider
      value={{
        color,
        setColor,
        listColor,
        setListColor,
        gradient,
        setGradient,
        background,
        setBackground,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export const useColorContext = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColorContext must be used within a ColorProvider");
  }
  return context;
};

export default ColorContext;
