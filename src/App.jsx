import { useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  CreditCard,
  LockKeyhole,
  PlayCircle,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const base = import.meta.env.BASE_URL;

const lessons = [
  {
    title: "Aula 1 - Fundamentos do design de sobrancelhas",
    duration: "18 min",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "Aula 2 - Simetria, mapeamento e visagismo",
    duration: "24 min",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "Aula 3 - Finalizacao, biosseguranca e atendimento",
    duration: "21 min",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

const questions = [
  {
    question: "Qual e o primeiro passo antes de iniciar um design de sobrancelhas?",
    options: ["Higienizar e analisar o rosto", "Aplicar henna imediatamente", "Retirar todos os pelos", "Comecar pela finalizacao"],
    answer: 0,
  },
  {
    question: "O mapeamento das sobrancelhas ajuda principalmente em qual objetivo?",
    options: ["Escolher a cor da parede", "Criar simetria e harmonia facial", "Acelerar o pagamento", "Evitar o uso de pinça"],
    answer: 1,
  },
  {
    question: "Por que a biosseguranca e importante no atendimento?",
    options: ["Para decorar a sala", "Para reduzir riscos e proteger cliente e profissional", "Para vender mais produtos", "Para substituir a tecnica"],
    answer: 1,
  },
  {
    question: "Em um curso livre, o certificado deve registrar quais dados principais?",
    options: ["Nome do aluno, curso, carga horaria e data", "Somente o telefone", "Apenas o Instagram", "Somente a nota"],
    answer: 0,
  },
  {
    question: "O design ideal deve considerar:",
    options: ["A moda do momento apenas", "Formato do rosto, pelos naturais e preferencia da cliente", "Somente sobrancelhas muito finas", "A mesma medida para todas"],
    answer: 1,
  },
  {
    question: "Qual cuidado deve ser tomado ao remover pelos?",
    options: ["Remover sem avaliar", "Respeitar o desenho natural e evitar falhas", "Usar qualquer produto", "Ignorar sensibilidade da pele"],
    answer: 1,
  },
  {
    question: "A comunicacao com a cliente serve para:",
    options: ["Entender expectativas e explicar o procedimento", "Evitar perguntas", "Pular a avaliacao", "Diminuir a qualidade"],
    answer: 0,
  },
  {
    question: "Qual nota minima aprova o aluno nesta prova?",
    options: ["5 acertos", "6 acertos", "7 acertos", "10 acertos obrigatorios"],
    answer: 2,
  },
  {
    question: "A finalizacao do atendimento deve buscar:",
    options: ["Aspecto limpo, harmonico e orientacoes de cuidado", "Esconder o resultado", "Aumentar a irritacao", "Trocar a tecnica sem aviso"],
    answer: 0,
  },
  {
    question: "O certificado pago so deve ser liberado quando:",
    options: ["O aluno abrir a pagina", "Houver aprovacao na prova e pagamento confirmado", "O aluno errar a prova", "Antes de assistir as aulas"],
    answer: 1,
  },
];

const certificateImageUrl = `${base}certificado-modelo.png`;

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function drawCertificate(context, image, data) {
  context.clearRect(0, 0, 1600, 1024);
  context.drawImage(image, 0, 0, 1600, 1024);

  context.fillStyle = "#1d1a18";
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.font = "700 32px Georgia, serif";
  context.fillText(data.studentName, 815, 423, 700);

  context.font = "400 19px Arial, sans-serif";
  context.textAlign = "left";
  context.fillText(data.cpf, 648, 492, 370);

  const [day = "", month = "", year = ""] = data.issuedDateParts;
  context.font = "400 18px Arial, sans-serif";
  context.textAlign = "center";
  context.fillText(day, 725, 742, 90);
  context.fillText(month, 905, 742, 250);
  context.fillText(year, 1125, 742, 120);

  context.textAlign = "right";
  context.fillStyle = "#77591e";
  context.font = "400 12px Arial, sans-serif";
  context.fillText(`Codigo: ${data.certificateCode} | Nota: ${data.scoreText}`, 1540, 1000, 460);
}

function App() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    cpf: "",
  });
  const [activeLesson, setActiveLesson] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [paid, setPaid] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formError, setFormError] = useState("");

  const score = useMemo(
    () =>
      questions.reduce((total, item, index) => {
        return total + (answers[index] === item.answer ? 1 : 0);
      }, 0),
    [answers]
  );

  const approved = submitted && score >= 7;
  const studentDataComplete =
    student.name.trim() !== "" && student.email.trim() !== "" && student.cpf.trim() !== "";
  const issuedDate = useMemo(() => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date());
  }, []);
  const issuedDateParts = useMemo(() => {
    const now = new Date();
    return [
      new Intl.DateTimeFormat("pt-BR", { day: "2-digit" }).format(now),
      new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(now),
      new Intl.DateTimeFormat("pt-BR", { year: "numeric" }).format(now),
    ];
  }, []);
  const certificateCode = useMemo(() => {
    const source = `${student.name || "ALUNO"}-${student.email || "EMAIL"}-LUANA`;
    let hash = 0;
    for (let i = 0; i < source.length; i += 1) {
      hash = (hash << 5) - hash + source.charCodeAt(i);
      hash |= 0;
    }
    return `LS-${Math.abs(hash).toString().slice(0, 6).padStart(6, "0")}`;
  }, [student]);

  const certificateData = useMemo(
    () => ({
      studentName: student.name.trim(),
      cpf: student.cpf.trim(),
      issuedDate,
      issuedDateParts,
      certificateCode,
      scoreText: submitted ? `${score}/10` : "--",
    }),
    [certificateCode, issuedDate, issuedDateParts, score, student.cpf, student.name, submitted]
  );

  function selectAnswer(questionIndex, optionIndex) {
    if (submitted) return;
    setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }));
  }

  function submitQuiz() {
    if (!studentDataComplete) {
      setFormError("Preencha nome completo, e-mail e CPF antes de finalizar a prova.");
      return;
    }
    if (Object.keys(answers).length < questions.length) return;
    setSubmitted(true);
    setPaid(false);
  }

  function resetQuiz() {
    setAnswers({});
    setSubmitted(false);
    setPaid(false);
    setQuizStarted(true);
    setCurrentQuestion(0);
  }

  function startQuiz() {
    if (!studentDataComplete) {
      setFormError("Preencha nome completo, e-mail e CPF para iniciar a prova.");
      return;
    }
    setFormError("");
    setQuizStarted(true);
    setCurrentQuestion(0);
  }

  function goToNextQuestion() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((question) => question + 1);
    }
  }

  function goToPreviousQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion((question) => question - 1);
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  async function downloadCertificatePdf() {
    const image = await loadImage(certificateImageUrl);

    const canvas = document.createElement("canvas");
    canvas.width = 1600;
    canvas.height = 1024;
    const context = canvas.getContext("2d");
    drawCertificate(context, image, certificateData);

    const jpgData = canvas.toDataURL("image/jpeg", 0.95).split(",")[1];
    const imageBytes = atob(jpgData);
    const content = "q\n1600 0 0 1024 0 0 cm\n/Im1 Do\nQ";
    const objects = [
      "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj",
      "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj",
      "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 1600 1024] /Resources << /XObject << /Im1 4 0 R >> >> /Contents 5 0 R >> endobj",
      `4 0 obj << /Type /XObject /Subtype /Image /Width 1600 /Height 1024 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imageBytes.length} >> stream\n${imageBytes}\nendstream endobj`,
      `5 0 obj << /Length ${content.length} >> stream\n${content}\nendstream endobj`,
    ];

    const offsets = [];
    let pdf = "%PDF-1.4\n";
    objects.forEach((line) => {
      offsets.push(pdf.length);
      pdf += `${line}\n`;
    });
    const xrefStart = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    offsets.forEach((offset) => {
      pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
    });
    pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

    const pdfBytes = new Uint8Array(pdf.length);
    for (let index = 0; index < pdf.length; index += 1) {
      pdfBytes[index] = pdf.charCodeAt(index) & 0xff;
    }
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `certificado-luana-santos-${certificateCode}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  const currentQuizItem = questions[currentQuestion];
  const currentAnswer = answers[currentQuestion];

  return (
    <main className="course-app">
      <section
        className="course-hero"
        id="inicio"
        style={{ "--hero-bg": `url(${base}Work/sobrancelha3.jpeg)` }}
      >
        <header className="topbar">
          <a className="brand" href="#inicio" aria-label="Luana Santos">
            <strong>Luana Santos</strong>
            <span>Curso Livre</span>
          </a>

          <button
            className={menuOpen ? "menu-toggle active" : "menu-toggle"}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="menu-principal"
          >
            <span />
            <span />
            <span />
          </button>

          <nav
            id="menu-principal"
            className={menuOpen ? "nav-menu active" : "nav-menu"}
            aria-label="Navegacao principal"
          >
            <a href="#aulas" onClick={closeMenu}>Aulas</a>
            <a
              href="#prova"
              onClick={() => {
                startQuiz();
                closeMenu();
              }}
            >
              Prova
            </a>
            <a href="#certificado" onClick={closeMenu}>Certificado</a>
          </nav>
        </header>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Curso online com certificado opcional</p>
            <h1>Design de Sobrancelhas</h1>
            <p>
              Assista as aulas pelo YouTube, faca a prova online e, com 7 ou
              mais acertos, emita seu certificado de conclusao.
            </p>

            <div className="hero-actions">
              <a className="button primary" href="#prova" onClick={startQuiz}>
                Fazer prova
              </a>
              <a className="button secondary" href="#aulas">
                Ver aulas
              </a>
            </div>

            <div className="trust-row" aria-label="Informacoes do curso">
              <span>
                <BookOpen size={16} /> 10 questoes
              </span>
              <span>
                <CheckCircle2 size={16} /> Aprovacao 7+
              </span>
              <span>
                <CreditCard size={16} /> Certificado R$ 29,90
              </span>
            </div>
          </div>

          <div className="hero-photo" aria-label="Luana Santos">
            <img src={`${base}luana-perfil.png`} alt="Luana Santos" />
          </div>
        </div>
      </section>

      <section className="mobile-first-band" aria-label="Resumo da experiencia">
        <div>
          <UserRound size={22} />
          <strong>Cadastro simples</strong>
          <span>Nome e e-mail para vincular a prova ao certificado.</span>
        </div>
        <div>
          <PlayCircle size={22} />
          <strong>Aulas no YouTube</strong>
          <span>Videos incorporados para assistir direto no celular.</span>
        </div>
        <div>
          <ShieldCheck size={22} />
          <strong>Certificado validavel</strong>
          <span>Codigo unico para futura consulta publica.</span>
        </div>
      </section>

      <section className="panel-section" id="aulas">
        <div className="section-heading">
          <p className="eyebrow">Area do aluno</p>
          <h2>Aulas do curso</h2>
        </div>

        <div className="lesson-layout">
          <div className="video-frame">
            <iframe
              title={lessons[activeLesson].title}
              src={lessons[activeLesson].videoUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="lesson-list">
            {lessons.map((lesson, index) => (
              <button
                className={activeLesson === index ? "lesson-item active" : "lesson-item"}
                key={lesson.title}
                onClick={() => setActiveLesson(index)}
              >
                <span>{lesson.title}</span>
                <small>{lesson.duration}</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="panel-section" id="prova">
        <div className="section-heading split">
          <div>
            <p className="eyebrow">Guia da prova</p>
            <h2>Prova online</h2>
          </div>
          <div className="score-pill">
            {submitted ? `${score}/10 acertos` : quizStarted ? `Questao ${currentQuestion + 1}/10` : "Nao iniciada"}
          </div>
        </div>

        {!quizStarted ? (
          <div className="quiz-start-card">
            <div>
              <h3>Antes de iniciar</h3>
              <p>
                A prova aparece como uma etapa separada do curso. Voce responde
                uma questao por vez e, ao final, recebe a nota automaticamente.
              </p>
            </div>

            <div className="student-form compact" aria-label="Dados do aluno">
              <label>
                Nome completo
                <input
                  value={student.name}
                  onChange={(event) => {
                    setStudent({ ...student, name: event.target.value });
                    setFormError("");
                  }}
                  placeholder="Digite seu nome"
                />
              </label>
              <label>
                E-mail
                <input
                  value={student.email}
                  onChange={(event) => {
                    setStudent({ ...student, email: event.target.value });
                    setFormError("");
                  }}
                  placeholder="seuemail@exemplo.com"
                  type="email"
                />
              </label>
              <label>
                CPF
                <input
                  value={student.cpf}
                  onChange={(event) => {
                    setStudent({ ...student, cpf: event.target.value });
                    setFormError("");
                  }}
                  placeholder="000.000.000-00"
                />
              </label>
            </div>

            {formError && <p className="form-error">{formError}</p>}

            <button className="button primary" disabled={!studentDataComplete} onClick={startQuiz}>
              Iniciar prova
            </button>
          </div>
        ) : (
          <div className="quiz-shell">
            <div className="student-form compact" aria-label="Dados do aluno">
              <label>
                Nome completo
                <input
                  value={student.name}
                  onChange={(event) => {
                    setStudent({ ...student, name: event.target.value });
                    setFormError("");
                  }}
                  placeholder="Digite seu nome"
                />
              </label>
              <label>
                E-mail
                <input
                  value={student.email}
                  onChange={(event) => {
                    setStudent({ ...student, email: event.target.value });
                    setFormError("");
                  }}
                  placeholder="seuemail@exemplo.com"
                  type="email"
                />
              </label>
              <label>
                CPF
                <input
                  value={student.cpf}
                  onChange={(event) => {
                    setStudent({ ...student, cpf: event.target.value });
                    setFormError("");
                  }}
                  placeholder="000.000.000-00"
                />
              </label>
            </div>

            {formError && <p className="form-error">{formError}</p>}

            <div className="quiz-progress" aria-label="Progresso da prova">
              {questions.map((_, index) => (
                <span
                  className={[
                    index === currentQuestion ? "active" : "",
                    answers[index] !== undefined ? "answered" : "",
                  ].join(" ")}
                  key={index}
                />
              ))}
            </div>

            <article className="question-card single-question">
              <span className="question-counter">
                Questao {currentQuestion + 1} de {questions.length}
              </span>
              <h3>{currentQuizItem.question}</h3>
              <div className="option-grid">
                {currentQuizItem.options.map((option, optionIndex) => {
                  const selected = currentAnswer === optionIndex;
                  const correct = submitted && currentQuizItem.answer === optionIndex;
                  const wrong = submitted && selected && currentQuizItem.answer !== optionIndex;

                  return (
                    <button
                      className={[
                        "option-button",
                        selected ? "selected" : "",
                        correct ? "correct" : "",
                        wrong ? "wrong" : "",
                      ].join(" ")}
                      key={option}
                      onClick={() => selectAnswer(currentQuestion, optionIndex)}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </article>

            <div className="quiz-actions spaced">
              <button
                className="button secondary"
                disabled={currentQuestion === 0}
                onClick={goToPreviousQuestion}
              >
                Voltar
              </button>

              {currentQuestion < questions.length - 1 ? (
                <button
                  className="button primary"
                  disabled={currentAnswer === undefined}
                  onClick={goToNextQuestion}
                >
                  Proxima questao
                </button>
              ) : !submitted ? (
                <button
                  className="button primary"
                  disabled={Object.keys(answers).length < questions.length || !studentDataComplete}
                  onClick={submitQuiz}
                >
                  Finalizar prova
                </button>
              ) : (
                <button className="button secondary" onClick={resetQuiz}>
                  Refazer prova
                </button>
              )}
            </div>

            {submitted && (
              <div className={approved ? "result-card approved" : "result-card"}>
                <strong>{approved ? "Aprovado" : "Tente novamente"}</strong>
                <span>
                  Voce acertou {score} de 10 questoes. O certificado e liberado
                  para quem atinge 7 ou mais acertos.
                </span>
              </div>
            )}
          </div>
        )}
      </section>

      <section className="certificate-section" id="certificado">
        <div className="certificate-info">
          <p className="eyebrow">Certificado pago</p>
          <h2>Emissao por R$ 29,90</h2>
          <p>
            A emissao sera liberada para alunos aprovados. Na versao final, o
            pagamento sera integrado ao Mercado Pago e confirmado por webhook.
          </p>

          <div className="status-stack">
            <span className={approved ? "done" : ""}>
              <CheckCircle2 size={18} /> Aprovacao na prova
            </span>
            <span className={paid ? "done" : ""}>
              <CreditCard size={18} /> Pagamento confirmado
            </span>
            <span className={approved && paid ? "done" : ""}>
              <Award size={18} /> Certificado liberado
            </span>
          </div>

          {approved ? (
            <div className="certificate-actions">
              <button className="button primary" onClick={() => setPaid(true)}>
                Simular pagamento R$ 29,90
              </button>
              <button
                className="button secondary"
                disabled={!paid}
                onClick={downloadCertificatePdf}
              >
                Baixar PDF
              </button>
            </div>
          ) : (
            <button className="button locked" disabled>
              <LockKeyhole size={16} /> Libera com 7+ acertos
            </button>
          )}
        </div>

        <div className={approved && paid ? "certificate-preview unlocked" : "certificate-preview"}>
          <div className="certificate-template">
            <img src={certificateImageUrl} alt="Modelo do certificado" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
