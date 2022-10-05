import { useState, useRef, useEffect } from "react";
import { Image } from "react-bootstrap";
import "react-slideshow-image/dist/styles.css";
import "./Main.scss";

function Main() {
  const images = useRef([
    {
      src: "https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black",
    },

    {
      src: "image/main_banner_2.png",
    },
  ]);
  const [current, setCurrent] = useState(0);
  const [style, setStyle] = useState({
    marginLeft: `-${current}00%`,
  });
  const imgSize = useRef(images.current.length);

  const moveSlide = (i) => {
    let nextIndex = current + i;

    if (nextIndex < 0) nextIndex = imgSize.current - 1;
    else if (nextIndex >= imgSize.current) nextIndex = 0;

    setCurrent(nextIndex);
  };

  useEffect(() => {
    setStyle({ marginLeft: `-${current}00%` });
  }, [current]);

  return (
    <div className="container">
      <div className="mainContainer">
        <div className="slideContainer">
          <div className="slide">
            <div className="slideTop">
              <div
                className="btn"
                onClick={() => {
                  moveSlide(-1);
                }}
              >
                &lt;
              </div>
              <div className="mainBox">
                <div className="flexBox" style={style}>
                  {" "}
                  {images.current.map((img, i) => (
                    <div
                      key={i}
                      className="img"
                      style={{ backgroundImage: `url(${img.src})` }}
                    ></div>
                  ))}
                </div>
              </div>
              <div
                className="btn"
                onClick={() => {
                  moveSlide(1);
                }}
              >
                &gt;
              </div>
            </div>
            <div className="position">
              {images.current.map((x, i) => (
                <div
                  key={i}
                  className={i === current ? "dot current" : "dot"}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid">
        <div className="news">
          <div>news</div>
          <div>news</div>
          <div>news</div>
          <div>news</div>
          <div>news</div>
          <div>news</div>
          <div>news</div>
          <div>news</div>
          <div>news</div>
        </div>

        <div className="new">
          <div>new</div>
          <div>new</div>
          <div>new</div>
          <div>new</div>
          <div>new</div>
          <div>new</div>
        </div>

        <div className="event">
          <div>event</div>
          <div>event</div>
          <div>event</div>
          <div>event</div>
          <div>event</div>
          <div>event</div>
        </div>
      </div>
    </div>
  );
}

export default Main;
