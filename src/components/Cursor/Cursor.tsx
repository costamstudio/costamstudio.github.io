import { animated, useSpring } from "react-spring";

import { useAppSelector } from "../../store/hooks";

import "./Cursor.scss";

export const Cursor = () => {
  const { x, y, type } = useAppSelector(({ cursor }) => cursor);

  const styles = useSpring({
    top: `${y}px`,
    left: `${x}px`,
  });

  return (
      <animated.div className={`cursor ${type.toLowerCase()}`} style={styles}/>
  );
};