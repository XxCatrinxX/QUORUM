import { useState, type CSSProperties } from "react";
import "./SushiBuilder.css";

import algaImage from "../../../assets/sushi/alga-base.png";
import riceImage from "../../../assets/sushi/arroz-base.png";

import avocadoImage from "../../../assets/sushi/aguacate.png";
import avocadoLayerImage from "../../../assets/sushi/aguacate-layer.png";

import cucumberImage from "../../../assets/sushi/pepino.png";

import atunImage from "../../../assets/sushi/atun.png";
import atunLayerImage from "../../../assets/sushi/atun-layer.png";

import mangoImage from "../../../assets/sushi/mango.png";

import edamameImage from "../../../assets/sushi/edamames.png";
import edamameLayerImage from "../../../assets/sushi/edamame-layer.png";

import carneImage from "../../../assets/sushi/carne.png";
import carneLayerImage from "../../../assets/sushi/carne-layer.png";

import cebollaImage from "../../../assets/sushi/cebolla.png";
import cebollaLayerImage from "../../../assets/sushi/cebolla-layer.png";

import noriImage from "../../../assets/sushi/nori.png";
import noriLayerImage from "../../../assets/sushi/nori-layer.png";

import aderezoImage from "../../../assets/sushi/aderezo.png";

import polloImage from "../../../assets/sushi/pollo.png";
import polloLayerImage from "../../../assets/sushi/pollo-layer.png";

import salmonImage from "../../../assets/sushi/salmon.png";
import salmonLayerImage from "../../../assets/sushi/salmon-layer.png";

type BaseType = "nori" | "rice";

type Ingredient = {
  id: string;
  name: string;
  orbitImage: string;
  layerImage: string;
};

const ingredients: Ingredient[] = [
  {
    id: "salmon",
    name: "Salmón",
    orbitImage: salmonImage,
    layerImage: salmonLayerImage,
  },
  {
    id: "tuna",
    name: "Atún",
    orbitImage: atunImage,
    layerImage: atunLayerImage,
  },
  {
    id: "chicken",
    name: "Pollo",
    orbitImage: polloImage,
    layerImage: polloLayerImage,
  },
  {
    id: "mango",
    name: "Mango",
    orbitImage: mangoImage,
    layerImage: mangoImage,
  },
  {
    id: "edamame",
    name: "Edamames",
    orbitImage: edamameImage,
    layerImage: edamameLayerImage,
  },
  {
    id: "cucumber",
    name: "Pepino",
    orbitImage: cucumberImage,
    layerImage: cucumberImage,
  },
  {
    id: "onion",
    name: "Cebolla",
    orbitImage: cebollaImage,
    layerImage: cebollaLayerImage,
  },
  {
    id: "seasoning",
    name: "Aderezo",
    orbitImage: aderezoImage,
    layerImage: aderezoImage,
  },
  {
    id: "nori",
    name: "Alga",
    orbitImage: noriImage,
    layerImage: noriLayerImage,
  },
  {
    id: "avocado",
    name: "Aguacate",
    orbitImage: avocadoImage,
    layerImage: avocadoLayerImage,
  },
  {
    id: "beef",
    name: "Carne",
    orbitImage: carneImage, 
    layerImage: carneLayerImage,
  },
];

const orbitDiameter =
  650 + Math.max(0, ingredients.length - 3) * 80;

export default function SushiBuilder() {
  const [baseType, setBaseType] = useState<BaseType | null>(null);
  const [layers, setLayers] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
    [],
  );
  const [canSelectIngredients, setCanSelectIngredients] = useState(false);
  const [flyingIngredient, setFlyingIngredient] = useState<string | null>(
    null,
  );

  const selectBase = (type: BaseType) => {
    setBaseType(type);
    setSelectedIngredients([]);
    setFlyingIngredient(null);
    setCanSelectIngredients(false);

    if (type === "nori") {
      setLayers(["nori", "rice"]);
    } else {
      setLayers(["rice", "nori"]);
    }
  };

  const getImage = (layer: string) => {
    if (layer === "nori") {
      return algaImage;
    }

    if (layer === "rice") {
      return riceImage;
    }

    const ingredient = ingredients.find(
      (item) => item.id === layer,
    );

    return ingredient?.layerImage ?? "";
  };

  const toggleIngredient = (ingredientId: string) => {
    const isSelected =
      selectedIngredients.includes(ingredientId);

    if (isSelected) {
      setSelectedIngredients((selected) =>
        selected.filter((id) => id !== ingredientId),
      );

      return;
    }

    if (flyingIngredient) {
      return;
    }

    setFlyingIngredient(ingredientId);
  };

  const finishIngredientAnimation = (ingredientId: string) => {
    setSelectedIngredients((selected) =>
      selected.includes(ingredientId)
        ? selected
        : [...selected, ingredientId],
    );

    setFlyingIngredient((current) =>
      current === ingredientId ? null : current,
    );
  };

  const resetBuilder = () => {
    setBaseType(null);
    setLayers([]);
    setSelectedIngredients([]);
    setCanSelectIngredients(false);
    setFlyingIngredient(null);
  };

  return (
    <main className="sushi-builder">
      {/* =====================================
          PASO 1
      ===================================== */}

      {!baseType && (
        <section className="sushi-step">
          <div className="sushi-step-header">
            <span>QUÓRUM LAB · 02</span>

            <h1>
              ¿Cómo quieres
              <br />
              construir tu <em>sushi?</em>
            </h1>

            <p>
              Elige cómo quieres comenzar tu sushi.
            </p>
          </div>

          <div className="sushi-base-buttons">
            <button
              type="button"
              className="sushi-base-button"
              onClick={() => selectBase("nori")}
            >
              <div className="base-button-image">
                <img
                  src={algaImage}
                  alt=""
                />
              </div>

              <div className="base-button-content">
                <span>01</span>

                <strong>
                  Alga primero
                </strong>

                <small>
                  Nori → Arroz
                </small>
              </div>

              <b>↗</b>
            </button>

            <button
              type="button"
              className="sushi-base-button"
              onClick={() => selectBase("rice")}
            >
              <div className="base-button-image">
                <img
                  src={riceImage}
                  alt=""
                />
              </div>

              <div className="base-button-content">
                <span>02</span>

                <strong>
                  Arroz primero
                </strong>

                <small>
                  Arroz → Nori
                </small>
              </div>

              <b>↗</b>
            </button>
          </div>
        </section>
      )}

      {/* =====================================
          PASO 2
      ===================================== */}

      {baseType && (
        <section className="sushi-construction">
          <div className="construction-header">
            <span>QUÓRUM LAB · 02</span>

            <h1>
              Construyamos
              <br />
              tu <em>sushi.</em>
            </h1>

            <p>
              {baseType === "nori"
                ? "Alga primero"
                : "Arroz primero"}
            </p>
          </div>

          {/* =================================
              BUILDER
          ================================= */}

          <div className="sushi-builder-area">
            <div className="sushi-stage">
              {/* =================================
                  SUSHI CENTRAL
              ================================= */}

              <div className="sushi-stack">
                {layers.map((layer, index) => (
                  <img
                    key={`${layer}-${index}`}
                    src={getImage(layer)}
                    alt=""
                    className={`sushi-layer${index === 1 ? " sushi-layer-second" : ""}`}
                    style={{
                      zIndex: index + 1,
                      animationDelay: `${index * 0.12}s`,
                    }}
                  />
                ))}

                {/* INGREDIENTES YA COLOCADOS */}

                {selectedIngredients.map(
                  (ingredient, index) => (
                    <img
                      key={ingredient}
                      src={getImage(ingredient)}
                      alt=""
                      className="sushi-layer selected-sushi-layer"
                      style={{
                        zIndex:
                          layers.length +
                          index +
                          1,
                      }}
                    />
                  ),
                )}
              </div>

              {/* =================================
                  INGREDIENTES ALREDEDOR
              ================================= */}

              <div
                className="ingredient-orbit"
                aria-label="Ingredientes disponibles"
                style={{ "--orbit-size": `${orbitDiameter}px` } as CSSProperties}
                onAnimationEnd={(event) => {
                  if (event.target === event.currentTarget) {
                    setCanSelectIngredients(true);
                  }
                }}
              >
                {ingredients.map((ingredient, index) => {
                  const angle =
                    (2 * Math.PI * index) / ingredients.length -
                    Math.PI / 2;
                  const x = 50 + Math.cos(angle) * 45;
                  const y = 50 + Math.sin(angle) * 45;
                  const isSelected =
                    selectedIngredients.includes(
                      ingredient.id,
                    );

                  const isFlying =
                    flyingIngredient ===
                    ingredient.id;

                  return (
                    <button
                      key={ingredient.id}
                      type="button"
                      className={`
                        ingredient-choice
                        ${isSelected ? "is-selected" : ""}
                        ${isFlying ? "is-flying" : ""}
                      `}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        "--start-left": `${x}%`,
                        "--start-top": `${y}%`,
                        animationDelay: `${index * 0.08}s`,
                      } as CSSProperties}
                      onClick={() =>
                        toggleIngredient(
                          ingredient.id,
                        )
                      }
                      disabled={
                        !canSelectIngredients ||
                        !!flyingIngredient
                      }
                      aria-label={`${isSelected ? "Quitar" : "Añadir"} ${ingredient.name}`}
                      aria-pressed={isSelected}
                      onAnimationEnd={(event) => {
                        if (
                          isFlying &&
                          event.target === event.currentTarget
                        ) {
                          finishIngredientAnimation(ingredient.id);
                        }
                      }}
                    >
                      {isSelected ? (
                        <b
                          className="ingredient-remove-mark"
                          aria-hidden="true"
                        >
                          ×
                        </b>
                      ) : (
                        <img
                          src={ingredient.orbitImage}
                          alt=""
                        />
                      )}

                      <span>
                        {ingredient.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* =================================
                ESTADO
            ================================= */}

            <p
              className="ingredient-status"
              aria-live="polite"
            >
              {flyingIngredient
                ? "Agregando ingrediente..."
                : canSelectIngredients
                  ? "Elige los ingredientes para tu sushi"
                  : "Preparando los ingredientes..."}
            </p>

            {/* =================================
                CAMBIAR BASE
            ================================= */}

            <button
              type="button"
              className="change-base"
              onClick={resetBuilder}
            >
              ← Cambiar base
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
