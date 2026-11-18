"use client";

import { useState } from "react";

const images = [
  "/DESTACADOS.png",
  "/DESTACADOS%20(2).png",
  "/DESTACADOS%20(3).png",
  "/DESTACADOS%20(4).png",
];

export default function HeroGallery() {
  const [current, setCurrent] = useState(-1);

  function nextImage() {
    setCurrent((prev) => (prev + 1) % (images.length + 1));
  }

  return (
    <div className="hero-art" style={{ position: "relative" }}>
      <div className="art-frame">
        <div className="art-inner">
          {current === -1 ? (
            <>
              <span className="art-word">O.</span>
              <span className="art-caption">
                CONTENIDO · DISEÑO · EXPERIENCIAS
              </span>
            </>
          ) : (
            <img
              src={images[current]}
              alt="Fotografía destacada de Orígenes"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          )}
        </div>
      </div>

      <button
        onClick={nextImage}
        style={{
          marginTop: "18px",
          padding: "13px 25px",
          background: "#26352a",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          borderRadius: "30px",
          fontSize: "13px",
        }}
      >
        Ver otra foto ↗
      </button>

      <div className="art-stamp">
        CHICLAYO<br />
        PERÚ<br />
        — 2026
      </div>
    </div>
  );
}
