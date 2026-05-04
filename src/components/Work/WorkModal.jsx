function WorkModal({ work, onClose }) {
  return (
    <div className="work-modal-backdrop" onClick={onClose}>
      <div className="work-modal" onClick={(e) => e.stopPropagation()}>
        <button className="work-modal-close" onClick={onClose}>
          ×
        </button>

        <h3>{work.title}</h3>

        <div className="work-modal-grid">
          {work.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${work.title} ${index + 1}`}
              style={{ animationDelay: `${index * 0.12}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WorkModal;