import { useState } from "react";
import "./work.css";
import WorkModal from "./WorkModal";

const base = import.meta.env.BASE_URL;

function Work() {
  const [selectedWork, setSelectedWork] = useState(null);

  const works = [
    {
      title: "Eyebrow Design",
      cover: `${base}Work/sobrancelha.jpeg`,
      images: [
        `${base}Work/sobrancelha.jpeg`,
        `${base}Work/sobrancelha2.jpeg`,
        `${base}Work/sobrancelha3.jpeg`,
      ],
    },
    {
      title: "Facial Massage",
      cover: `${base}Work/massagem.JPG`,
      images: [
        `${base}Work/massagem.JPG`,
        `${base}Work/massagem2.jpeg`,
        `${base}Work/massagem3.jpeg`,
        `${base}Work/massagem4.jpeg`,
        `${base}Work/massagem5.jpeg`,
        `${base}Work/massagem6.jpeg`,
      ],
    },
    {
      title: "Results",
      cover: `${base}Work/sobrancelha2.jpeg`,
      images: [
        `${base}Work/sobrancelha.jpeg`,
        `${base}Work/sobrancelha2.jpeg`,
        `${base}Work/sobrancelha3.jpeg`,
      ],
    },
    {
      title: "Skin Care",
      cover: `${base}Work/massagem3.jpeg`,
      images: [
        `${base}Work/massagem3.jpeg`,
        `${base}Work/massagem4.jpeg`,
        `${base}Work/massagem5.jpeg`,
      ],
    },
    {
      title: "Beauty Care",
      cover: `${base}Work/massagem4.jpeg`,
      images: [
        `${base}Work/massagem6.jpeg`,
        `${base}Work/massagem2.jpeg`,
        `${base}Work/massagem4.jpeg`,
      ],
    },
  ];

  return (
    <section className="work" id="portfolio">
      <h2>My Work</h2>
      <div className="work-heart">♡</div>

      <div className="work-grid">
        {works.map((item, index) => (
          <button
            className="work-card"
            key={index}
            onClick={() => setSelectedWork(item)}
          >
            <img src={item.cover} alt={item.title} />
            <div className="work-overlay">
              <span>{item.title}</span>
            </div>
          </button>
        ))}
      </div>

      {selectedWork && (
        <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />
      )}
    </section>
  );
}

export default Work;