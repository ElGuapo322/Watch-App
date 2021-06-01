import { useState, useEffect, useRef } from "react";
import "./styles.css";

export default function App() {
  const [count, setCount] = useState({
    ss: 0,
    mm: 0,
    hh: 0
  });
  const [lap, setLap] = useState([]);
  const [delay, setDelay] = useState(null);

  useInterval(() => {
    if (delay !== null) {
      setCount({ ...count, ss: count.ss + 1 });
      if (count.ss == 59 && count.mm !== 59) {
        setCount({ ...count, ss: 0, mm: count.mm + 1 });
      } else if (count.mm == 59 && count.ss == 59) {
        setCount({ ...count, ss: 0, mm: 0, hh: count.hh + 1 });
      }
    }
  }, delay);

  const startBtn = (e) => {
    setDelay(1000);
  };
  const stopBtn = (e) => {
    setDelay(null);
  };
  const resetBtn = (e) => {
    setCount({ ...count, ss: 0, mm: 0, hh: 0 });
    setLap([]);
  };
  const lapBtn = (e) => {
    setLap([...lap, count]);
  };
  return (
    <div className="watch-app">
      <div className="app-content">
        <div className="display-time">
          {setTime(count.hh) +
            ":" +
            setTime(count.mm) +
            ":" +
            setTime(count.ss)}
        </div>
        <div className="button-block">
          <button
            disabled={delay === null}
            className="buttons"
            onClick={stopBtn}
          >
            II
          </button>
          <button
            className="buttons"
            id="start-btn"
            onClick={startBtn}
            disabled={delay !== null}
          >
            ■
          </button>
          <button
            className="buttons"
            onClick={resetBtn}
            disabled={delay !== null}
          >
            ♻
          </button>
        </div>
        <div className="lap-time">
          <div className="btn-block">
            <button
              id="lap-btn"
              onClick={lapBtn}
              className="buttons"
              disabled={delay === null}
            >
              Lap
            </button>
          </div>
          <div>
            {lap.map((item) => (
              <div className="row">
                <div className="row-title">Lap Time</div>
                <div className="row-time">
                  {setTime(item.hh) +
                    ":" +
                    setTime(item.mm) +
                    ":" +
                    setTime(item.ss)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
function setTime(time) {
  if (time < 10) {
    return "0" + time;
  } else return time;
}
