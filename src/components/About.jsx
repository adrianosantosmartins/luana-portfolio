import "./About.css";

function About() {
  return (
    <section className="about">

      <div className="about-left">
        <div className="about-photo">
          <img src="/luana-perfil.png" alt="Luana Santos" />
        </div>
      </div>

      <div className="about-center">
        <p className="section-eyebrow">♡ Get to know me</p>

        <h2>About Me</h2>

        <p className="about-text">
          Passionate about enhancing the natural beauty in every woman, my work goes beyond aesthetics.
          It’s about confidence, self-care, and creating a unique experience for every client.
        </p>

        <p className="about-text">
          Every detail matters. From the products I use to the techniques I apply, everything is designed
          to deliver premium results with a personal touch.
        </p>
      </div>

      <div className="about-right">
        <div className="about-stats">
          <div className="stat">
            <strong>+5</strong>
            <span>Years of Experience</span>
          </div>

          <div className="stat">
            <strong>+1K</strong>
            <span>Happy Clients</span>
          </div>

          <div className="stat">
            <strong>+10</strong>
            <span>Services</span>
          </div>

          <div className="stat">
            <strong>100%</strong>
            <span>Dedication</span>
          </div>
        </div>
      </div>

    </section>
  );
}

export default About;