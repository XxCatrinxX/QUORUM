import "./Lab.css";

type LabExperiment = {
  number: string;
  title: string;
  description: string;
  category: string;
  technology: string;
  preview: string;
  path: string;
};

const experiments: LabExperiment[] = [
  {
    number: "01",
    title: "Sushi Builder",
    description:
      "Una experiencia interactiva para construir un sushi ingrediente por ingrediente.",
    category: "Interactive Experience",
    technology: "React · GSAP",
    preview: "🍣",
    path: "/lab/sushi-builder",
  },
];

export default function Lab() {
  return (
    <div className="lab-page">
      <section className="lab-hero">
        <p className="lab-eyebrow">QUÓRUM LAB</p>

        <h1>
          Exploramos nuevas{" "}
          <span>formas de hacer tecnología.</span>
        </h1>

        <p className="lab-hero-description">
          Un espacio donde experimentamos con interacción, motion design,
          interfaces y experiencias digitales.
        </p>
      </section>

      <section className="lab-experiences">
        <div className="lab-section-header">
          <div>
            <p className="lab-section-number">01</p>
            <h2>Experiencias</h2>
          </div>

          <p className="lab-section-description">
            Prototipos y conceptos interactivos desarrollados por QUÓRUM.
          </p>
        </div>

        <div className="lab-grid">
          {experiments.map((experiment) => (
            <a
              key={experiment.number}
              href={experiment.path}
              className="lab-card"
            >
              <div className="lab-card-top">
                <span className="lab-category">
                  {experiment.category}
                </span>

                <span className="lab-number">
                  {experiment.number}
                </span>
              </div>

              <div className="lab-preview">
                {experiment.preview}
              </div>

              <div className="lab-info">
                <h3>{experiment.title}</h3>

                <p>{experiment.description}</p>

                <div className="lab-card-footer">
                  <span className="lab-tech">
                    {experiment.technology}
                  </span>

                  <span className="lab-arrow">↗</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}