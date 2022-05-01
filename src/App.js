import React from "react";

import { menu as Menu } from "components/menu/menu";
import { Container } from "components/container/container";
import { Tile } from "components/tile/tile";

export const App = () => {
  const [menuClass, setMenuClass] = React.useState("menuItem");

  const [tiles, setTiles] = React.useState([]);

  React.useEffect(() => {
    const storage = { ...window.localStorage };
    for (const [key, value] of Object.entries(storage)) {
      setTiles((tile) => [...tile, <Tile key={key} pid={key} bg={value} />]);
    }
  }, []);

  return (
    <div>
      <Container tiles={tiles} />
      <Menu
        menuClass={menuClass}
        setMenuClass={setMenuClass}
        setTiles={setTiles}
        tiles={tiles}
      />
    </div>
  );
};
