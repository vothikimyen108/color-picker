import React from "react";
import GradientColorItem from "./GradientColorItem.tsx";
import "./GradientColorItem.css";
import { useColorContext } from "../../ColorContext.tsx";

const GradientColorList = () => {
  const { listColor, setListColor } = useColorContext();

  const handleOnClick = (itemSelected: ColorItem) => {
    const newList = listColor.map((item) => {
      const isSelected = itemSelected.id === item.id;
      return { ...item, selected: isSelected };
    });
    setListColor(newList);
  };
  const onChangeStop = (num: number, itemColor: ColorItem) => {
    const newList = listColor.map((item) => {
      const isSelected = itemColor.id === item.id;
      return { ...item, stop: isSelected ? num : item.stop };
    });
    setListColor(newList);
  };

  return (
    <div>
      <div className={`color-item`}>
        <div className="color-item-id">
          <h6>STT</h6>
        </div>
        <div className="color-item-name">
          <h6>Color</h6>
        </div>
        <div className="color-item-code">
          <h6>HEX</h6>
        </div>
        <div className="color-item-stop">
          <h6>STOP</h6>
        </div>
      </div>
      {listColor.map((item) => (
        <div onClick={() => handleOnClick(item)} key={item.id}>
          <GradientColorItem
            onChangeStop={onChangeStop}
            colorItem={item}
          ></GradientColorItem>
        </div>
      ))}
    </div>
  );
};

export default GradientColorList;
