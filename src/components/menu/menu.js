import { v4 as uuidv4 } from "uuid";
import { Tile } from "components/tile/tile";

import "style/menu.scss";

export const menu = (props) => {
  const { menuClass, setMenuClass, setTiles } = props;

  const handleClick = () => {
    if (menuClass === "menuItem") {
      setMenuClass("menuItem clicked");
    } else {
      setMenuClass("menuItem");
    }
    const uuid = uuidv4();
    setTiles((tile) => [...tile, <Tile key={uuid} pid={uuid} />]);
  };

  return (
    <div className="menu">
      <div className={menuClass} onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
          <path d="M24 38Q23.35 38 22.925 37.575Q22.5 37.15 22.5 36.5V25.5H11.5Q10.85 25.5 10.425 25.075Q10 24.65 10 24Q10 23.35 10.425 22.925Q10.85 22.5 11.5 22.5H22.5V11.5Q22.5 10.85 22.925 10.425Q23.35 10 24 10Q24.65 10 25.075 10.425Q25.5 10.85 25.5 11.5V22.5H36.5Q37.15 22.5 37.575 22.925Q38 23.35 38 24Q38 24.65 37.575 25.075Q37.15 25.5 36.5 25.5H25.5V36.5Q25.5 37.15 25.075 37.575Q24.65 38 24 38Z" />
        </svg>
      </div>
    </div>
  );
};
