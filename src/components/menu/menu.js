import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Tile } from "components/tile/tile";

import "style/menu.scss";

let variables = {};

export const Menu = (props) => {
  const { menuClass, setMenuClass, setTiles, tiles } = props;
  const [colors, setColors] = React.useState([]);
  const [popup, setPopup] = React.useState({ display: "none" });

  const handleClick = () => {
    if (menuClass === "menuItem") {
      setMenuClass("menuItem clicked");
    } else {
      setMenuClass("menuItem");
    }
    const uuid = uuidv4();
    setTiles((tile) => [
      ...tile,
      <Tile
        key={uuid}
        pid={uuid}
        bg={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
      />,
    ]);
  };

  const handleSetLabel = (e) => {
    variables[e.target.id][0] = e.target.value;
  };

  const handleDowload = () => {
    for (let i = 0; i < tiles.length; i++) {
      setColors((color) => [
        ...color,
        <div
          style={{ background: tiles[i].props.bg }}
          key={tiles[i].props.pid}
          className="popupElement"
        >
          <input
            type={"text"}
            id={tiles[i].props.pid}
            placeholder={"Label"}
            onChange={handleSetLabel}
          />
        </div>,
      ]);
      variables[tiles[i].props.pid] = [null, tiles[i].props.bg];
    }

    if (popup.display === "none") {
      setPopup({ display: "block" });
    } else if (popup.display === "block") {
      setPopup({ display: "none" });
      setColors([]);
      variables = {};
    }
  };

  const handleExport = () => {
    let file = "";
    for (const [key, value] of Object.entries(variables)) {
      file += `$${value[0]}: ${value[1]};\n`;
    }
    dowanlod("colors.scss", file);
    setPopup({ display: "none" });
    setColors([]);
    variables = {};
  };

  return (
    <>
      <div className="popup" style={popup}>
        <span>Export</span>
        <div className="popupContent"> {colors.map((color) => color)}</div>
        <div className="popupBnt">
          <button onClick={handleExport} style={{ borderColor: "#33c345" }}>
            Accept
          </button>
          <button
            onClick={() => {
              setPopup({ display: "none" });
              setColors([]);
              variables = {};
            }}
            style={{ borderColor: "#f86162" }}
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="menu">
        <div className="menuItem" onClick={handleDowload}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="svg"
            height="48"
            width="48"
          >
            <path d="M24 31.75Q23.7 31.75 23.45 31.65Q23.2 31.55 22.95 31.3L15.4 23.75Q14.95 23.3 14.975 22.675Q15 22.05 15.45 21.6Q15.9 21.15 16.525 21.15Q17.15 21.15 17.6 21.6L22.5 26.55V9.5Q22.5 8.85 22.925 8.425Q23.35 8 24 8Q24.65 8 25.075 8.425Q25.5 8.85 25.5 9.5V26.55L30.45 21.6Q30.9 21.15 31.525 21.15Q32.15 21.15 32.6 21.6Q33.05 22.05 33.05 22.675Q33.05 23.3 32.6 23.75L25.05 31.3Q24.8 31.55 24.55 31.65Q24.3 31.75 24 31.75ZM11 40Q9.8 40 8.9 39.1Q8 38.2 8 37V31.35Q8 30.7 8.425 30.275Q8.85 29.85 9.5 29.85Q10.15 29.85 10.575 30.275Q11 30.7 11 31.35V37Q11 37 11 37Q11 37 11 37H37Q37 37 37 37Q37 37 37 37V31.35Q37 30.7 37.425 30.275Q37.85 29.85 38.5 29.85Q39.15 29.85 39.575 30.275Q40 30.7 40 31.35V37Q40 38.2 39.1 39.1Q38.2 40 37 40Z" />
          </svg>
        </div>
        <div className={menuClass} onClick={handleClick}>
          <svg
            className="svg"
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            width="48"
          >
            <path d="M24 38Q23.35 38 22.925 37.575Q22.5 37.15 22.5 36.5V25.5H11.5Q10.85 25.5 10.425 25.075Q10 24.65 10 24Q10 23.35 10.425 22.925Q10.85 22.5 11.5 22.5H22.5V11.5Q22.5 10.85 22.925 10.425Q23.35 10 24 10Q24.65 10 25.075 10.425Q25.5 10.85 25.5 11.5V22.5H36.5Q37.15 22.5 37.575 22.925Q38 23.35 38 24Q38 24.65 37.575 25.075Q37.15 25.5 36.5 25.5H25.5V36.5Q25.5 37.15 25.075 37.575Q24.65 38 24 38Z" />
          </svg>
        </div>
        <div className="menuItem">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            width="48"
            fill="#212124"
          >
            <path d="M24 31.75Q23.7 31.75 23.45 31.65Q23.2 31.55 22.95 31.3L15.4 23.75Q14.95 23.3 14.975 22.675Q15 22.05 15.45 21.6Q15.9 21.15 16.525 21.15Q17.15 21.15 17.6 21.6L22.5 26.55V9.5Q22.5 8.85 22.925 8.425Q23.35 8 24 8Q24.65 8 25.075 8.425Q25.5 8.85 25.5 9.5V26.55L30.45 21.6Q30.9 21.15 31.525 21.15Q32.15 21.15 32.6 21.6Q33.05 22.05 33.05 22.675Q33.05 23.3 32.6 23.75L25.05 31.3Q24.8 31.55 24.55 31.65Q24.3 31.75 24 31.75ZM11 40Q9.8 40 8.9 39.1Q8 38.2 8 37V31.35Q8 30.7 8.425 30.275Q8.85 29.85 9.5 29.85Q10.15 29.85 10.575 30.275Q11 30.7 11 31.35V37Q11 37 11 37Q11 37 11 37H37Q37 37 37 37Q37 37 37 37V31.35Q37 30.7 37.425 30.275Q37.85 29.85 38.5 29.85Q39.15 29.85 39.575 30.275Q40 30.7 40 31.35V37Q40 38.2 39.1 39.1Q38.2 40 37 40Z" />
          </svg>
        </div>
      </div>
    </>
  );
};

const dowanlod = (filename, data) => {
  const blob = new Blob([data], { type: "text/csv" });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const elem = window.document.createElement("a");
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
};
