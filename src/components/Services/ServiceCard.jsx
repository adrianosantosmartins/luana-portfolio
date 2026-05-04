function ServiceCard({ icon, title, description }) {
  return (
    <article className="service-card">
      <div className="service-icon">{icon}</div>

      <h3>{title}</h3>
      <p>{description}</p>

      <a href="#" className="service-link">
        Learn more <span>›</span>
      </a>
    </article>
  );
}

export default ServiceCard;