import "./services.css";
import ServiceCard from "./ServiceCard";

import {
  Eye,
  Sparkles,
  PenTool,
  Smile,
  Camera
} from "lucide-react";

function Services() {
  const services = [
    {
      icon: <Eye size={28} />,
      title: "Eyebrow Design",
      description: "Enhancing your natural beauty with symmetry and harmony.",
    },
    {
      icon: <Sparkles size={28} />,
      title: "Lashes",
      description: "Fuller and beautifully shaped lashes to enhance your look.",
    },
    {
      icon: <PenTool size={28} />,
      title: "Micropigmentation",
      description: "Natural and long-lasting techniques to highlight your beauty.",
    },
    {
      icon: <Smile size={28} />,
      title: "Facial Aesthetics",
      description: "Care that refreshes, hydrates, and restores your natural glow.",
    },
    {
      icon: <Camera size={28} />,
      title: "Content & Lifestyle",
      description: "Beauty tips, routine, and self-esteem for everyday life.",
    },
  ];

  return (
    <section className="services">
      <h2>My Services</h2>
      <div className="services-heart">♡</div>

      <div className="services-grid">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
}

export default Services;