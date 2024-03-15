import React, { useState } from "react";
import "./Card.css";

function Card({ data }) {
  const [tiltAngle, setTiltAngle] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [speed, setSpeed] = useState(20);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const angleX = ((xPos - centerX) / centerX) * speed;
    const angleY = ((yPos - centerY) / centerY) * -speed;

    setTiltAngle({ x: angleX, y: angleY });
  };

  const handleMouseEnter = () => {
    setScale(1.1);
    setSpeed(40);
  };

  const handleMouseLeave = () => {
    setTiltAngle({ x: 0, y: 0 });
    setScale(1);
    setSpeed(20);
  };
  return (
    <div
      className="card"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tiltAngle.x}deg) rotateY(${tiltAngle.y}deg) scale(${scale})`,
      }}
    >
      <h2>{data.text}</h2>
      <div className="card-result-center">
        <h1>
          {data.v}
          {data.measurement}
        </h1>
      </div>
    </div>
  );
}

export default Card;
