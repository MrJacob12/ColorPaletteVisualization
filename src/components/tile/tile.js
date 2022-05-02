import React from "react";
import { useColor, ColorPicker } from "react-color-palette";

import "style/tile.scss";
import "react-color-palette/lib/css/styles.css";

import palette from "assets/palette.svg";
import rm from "assets/rm.svg";
import save from "assets/save.svg";

export const Tile = (props) => {
  const { pid, bg, loaded } = props;

  const firstColor = Math.floor(Math.random() * 16777215).toString(16);
  const [bgColor, setBgColor] = React.useState(`#${firstColor}`);
  const [color, setColor] = useColor("hex", bg ? bg : `#${firstColor}`);

  const [value, setValue] = React.useState(`#${firstColor}`);
  const [saved, setSaved] = React.useState("save");

  const [paletteOpen, setPaletteOpen] = React.useState({ display: "none" });

  React.useEffect(() => {
    if (bg) {
      setBgColor(bg);
      setValue(bg);
    }
  }, [bg]);

  React.useEffect(() => {
    setValue(color.hex);
    setBgColor(color.hex);
    if (saved === "save saved") {
      localStorage.setItem(pid, color.hex);
    }
  }, [color]);

  React.useEffect(() => {
    if (loaded) {
      setSaved("save saved");
    }
  }, [loaded]);

  const colorChange = (e) => {
    setValue(e.target.value);
    if (/^#[0-9a-f]{3,6}$/i.test(e.target.value)) {
      setBgColor(e.target.value);
    }
  };

  const deleteTile = () => {
    document.getElementById(pid).remove();
    setPaletteOpen({ display: "none" });
  };

  const saveTile = () => {
    if (localStorage.getItem(pid)) {
      localStorage.removeItem(pid);
    } else {
      localStorage.setItem(pid, bgColor);
    }

    if (saved === "save") {
      setSaved("save saved");
    } else {
      setSaved("save");
    }
  };

  const openPalette = () => {
    if (paletteOpen.display === "none") {
      setPaletteOpen({ display: "block" });
    } else {
      setPaletteOpen({ display: "none" });
    }
  };

  return (
    <>
      <div className="palette" style={paletteOpen}>
        <ColorPicker
          width={window.innerWidth}
          height={150}
          color={color}
          onChange={setColor}
          hideHSV
          dark
        />
      </div>
      <div className="tile" style={{ background: bgColor }} id={pid}>
        <div className="tileItem">
          <input
            type="text"
            value={value}
            placeholder={`#${firstColor}`}
            onChange={colorChange}
          />
          <img
            className={saved}
            src={save}
            alt="save"
            height={"23px"}
            width={"23px"}
            onClick={saveTile}
          />
          <img
            className={"palette"}
            src={palette}
            alt="palette"
            height={"23px"}
            width={"23px"}
            onClick={openPalette}
          />
          <img
            className="rm"
            src={rm}
            alt="remove"
            height={"23px"}
            width={"23px"}
            onClick={deleteTile}
          />
        </div>
      </div>
    </>
  );
};
