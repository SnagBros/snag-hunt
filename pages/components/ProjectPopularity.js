
import { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";
export default function ProjectPopularity(props) {
  const [count, setCount] = useState(props.popularity);
  const [fireSize, setFireSize] = useState([styles.fire, styles.small].join(" "));

  const imageClick = () => {
    setCount(count++);
  }

  useEffect(() => {
    if (count >= 5) {
      setFireSize([styles.fire, styles.medium].join(" "))
    }
    if (count >= 10) {
      setFireSize([styles.fire, styles.large].join(" "))
    }
  }, [count]);

  return (
    <>
    <div className={fireSize}>
        <img
          onClick={() => imageClick()}
          className={styles.fireCentre}
          src="https://media.giphy.com/media/VIE8BijRkECoGB9vuM/giphy.gif"
        ></img>
    </div>
    <p>{count}</p>
    </>
  );
}