import React from "react";

import "style/container.scss";

export function Container(props) {
  const { tiles } = props;
  const [elements, setElements] = React.useState([]);
  React.useEffect(() => {
    setElements(tiles);
  }, [tiles]);

  return <div className="container">{elements.map((i) => i)}</div>;
}
