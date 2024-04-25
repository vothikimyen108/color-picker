interface HslColor {
  hue: number;
  saturation: number;
  lightness: number;
}


interface Color {
  hslColor: HslColor;
  hexColor: string
  bgColorPicker: HslColor;
  bgColor: string;
  rgbaColor: RgbColor;
}

interface RgbColor {
  r: number,
  g: number,
  b: number,
  a?: number
}

interface ColorItem {
  id: number
  color: Color,
  stop: number,
  selected: boolean
}

interface GradientTool {
  isLinear: boolean
  deg: number
}
 

interface ColorResult {
  hexValue?: string; // Giá trị hex màu
  error?: string; // Thông báo lỗi (nếu có)
}

interface ColorMap {
  [key: string]: string;
}