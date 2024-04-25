import tinycolor from "tinycolor2";
import { colorMap } from "./const.ts";

export const HSLToHex = (h: number, s: number, l: number): string => {
  const color = tinycolor({ h: h, s: s, l: l });
  return color.toHexString();
};

export const RGBToHex = (rgb: { r: number; g: number; b: number }): string => {
  const color = tinycolor(rgb);
  return color.toHexString();
};

export const RBGToHSL = (rgb: {
  r: number;
  g: number;
  b: number;
}): HslColor => {
  const color = tinycolor(rgb);
  const hsl = color.toHsl();
  return {
    hue: Math.round(hsl.h),
    saturation: Math.round(hsl.s * 100),
    lightness: Math.round(hsl.l * 100),
  };
};

export const HexToHSL = (hex: string): HslColor => {
  const color = tinycolor(hex);
  const hsl = color.toHsl();
  return {
    hue: Math.round(hsl.h),
    saturation: Math.round(hsl.s * 100),
    lightness: Math.round(hsl.l * 100),
  };
};

export const isHexColor = (hex: string): boolean => {
  return tinycolor(hex).isValid();
};

export const RGBToHSL = (rgb: {
  r: number;
  g: number;
  b: number;
}): HslColor => {
  const color = tinycolor(rgb);
  const hsl = color.toHsl();
  return {
    hue: Math.round(hsl.h),
    saturation: Math.round(hsl.s * 100),
    lightness: Math.round(hsl.l * 100),
  };
};

export const HSLToRGB = (h: number, s: number, l: number): RgbColor => {
  const color = tinycolor({ h: h, s: s / 100, l: l / 100 });
  const rgb = color.toRgb();
  return { r: rgb.r, g: rgb.g, b: rgb.b, a: 1};
};

export const RGBtoXYZ = (
  rgb: [number, number, number]
): { x: number; y: number; z: number } => {
  const color = tinycolor({ r: rgb[0], g: rgb[1], b: rgb[2] });
  const xyz = color.toXyz();
  return { x: xyz.x, y: xyz.y, z: xyz.z };
};

export const hexToRGBA = (hex: string, alpha: number): RgbColor => {
  const color = tinycolor(hex);
  const rgba = color.setAlpha(alpha).toRgb();
  return { r: rgba.r, g: rgba.g, b: rgba.b, a: rgba.a };
};

export const colorToText = (color: Color, stop: number): string => {
  const { rgbaColor } = color;
  const textRgba = `rgba(${rgbaColor.r},${rgbaColor.g},${rgbaColor.b},${
    rgbaColor.a ? rgbaColor.a : 1
  }) ${stop}%`;
  return textRgba;
};

export const listColorToText = (list: ColorItem[]) => {
  const newList: string[] = list.map((item) =>
    colorToText(item.color, item.stop)
  );
  return newList.join(",");
};

export const handleColorInput = (input: string): ColorResult => {
  let value = input.trim();
  let result: ColorResult = {};

  if (value.startsWith("#") && value.length === 4) {
    value = `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`;
  }

  if (value.startsWith("#")) {
    if (/^#[0-9A-Fa-f]{6}$/i.test(value)) {
      result.hexValue = value;
    } else {
      result.error = "Invalid hex color format";
    }
  } else {
    const lowercaseValue = value.toLowerCase();
    if (colorMap.hasOwnProperty(lowercaseValue)) {
      const hexValue = colorMap[lowercaseValue];
      result.hexValue = hexValue;
    } else {
      result.error = "Invalid color name or hex format";
    }
  }

  if (result.error) {
    result.error = "Invalid color name or hex format";
  }
  return result;
};

export const processValue= (value: number, max: number): number => {
  let newValue = value
  if(value > max)  {
    newValue = max
  }
  return newValue;
}

export const processValueA= (value: number, min: number, max: number): number => {
  let newValue = value
  if(value > 1)  {
    newValue = 1
  }
  return newValue;
}