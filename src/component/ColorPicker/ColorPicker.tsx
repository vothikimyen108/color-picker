import React, { useRef, useEffect, useLayoutEffect } from "react";
import { useColorContext } from "../../ColorContext.tsx";
import "./ColorPicker.css";
import {
  HSLToHex,
  HSLToRGB,
  RGBToHSL,
  colorToText,
} from "../../common/until.tsx";

const ColorPicker: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const circlePickerRef = useRef<HTMLDivElement>(null);
  const { color, setColor } = useColorContext();

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const picker = pickerRef.current;
    const circle = circlePickerRef.current;

    if (!canvas || !picker || !circle) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const newWidth = picker.offsetWidth;
    const newHeight = picker.offsetHeight;

    // Update canvas width and height
    canvas.width = newWidth;
    canvas.height = newHeight;
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background and gradients
    const { hue, saturation, lightness } = color.bgColorPicker;
    const { r, g, b } = HSLToRGB(hue, saturation, lightness);
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "#fff"); // Màu trắng ở đầu
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)"); // Trong suốt ở cuối
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const gradient2 = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient2.addColorStop(0, "transparent");
    gradient2.addColorStop(1, "black");
    ctx.fillStyle = gradient2;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const { x, y } = findPixelMatchingColor(ctx, canvas);
    if (circlePickerRef.current) {
      const circle = circlePickerRef.current;
      const left = x - circle.offsetWidth / 2;
      const top = y - circle.offsetHeight / 2;
      circle.style.left = `${left}px`;
      circle.style.top = `${top}px`;
    }

    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  }, [color.bgColorPicker]);

  const findPixelMatchingColor = (ctx, canvas) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const targetRgb = color.rgbaColor;

    let xW = -1; // Initialize to an invalid value if pixel not found
    let yW = -1;
    // Iterate over each pixel in the canvas
    for (let y = -1; y < canvas.height; y++) {
      for (let x = -1; x < canvas.width; x++) {

        //const pixelOffset = (y * canvas.width + x) * 4;
        const imageData1 = ctx.getImageData(x, y, 1, 1);
        const red = imageData1.data[0];
        const green = imageData1.data[1];
        const blue = imageData1.data[2];
        if (
          red === targetRgb.r &&
          green === targetRgb.g &&
          blue === targetRgb.b
        ) {
          xW = x;
          yW = y;
          break; 
        }
      }
      if (xW !== -1 && yW !== -1) {
        break; 
      }
    }
    return { x: xW, y: yW };
  };

  const handleClick = (event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    // Check if the click is within the canvas bounds
    // if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) {
    //   return; // Clicked outside canvas bounds
    // }

    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    const rgbColor: RgbColor = {
      r: pixelData[0],
      g: pixelData[1],
      b: pixelData[2],
      a: 1
    };

    const hslColor: HslColor = RGBToHSL(rgbColor);
    const hexColor = HSLToHex(
      hslColor.hue,
      hslColor.saturation,
      hslColor.lightness
    );

    setColor({
      bgColorPicker: color.bgColorPicker,
      hexColor,
      hslColor,
      bgColor: `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`,
      rgbaColor: HSLToRGB(
        hslColor.hue,
        hslColor.saturation,
        hslColor.lightness
      ),
    });

    const circle = circlePickerRef.current;
    if (circle) {
      const left = x - circle.offsetWidth / 2;
      const top = y - circle.offsetHeight / 2;
      circle.style.left = `${left}px`;
      circle.style.top = `${top}px`;
      circle.style.backgroundColor = `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;
      circle.style.zIndex = "10";
    }
  };


  return (
    <div className="color-picker-container" ref={pickerRef}>
      <canvas
        ref={canvasRef}
        className="color-picker-canvas"
        width={300}
        height={200}
      ></canvas>
      <div
        className="color-picker-circle"
        style={{ backgroundColor: color.bgColor }}
        ref={circlePickerRef}
      ></div>
    </div>
  );
};

export default ColorPicker;
