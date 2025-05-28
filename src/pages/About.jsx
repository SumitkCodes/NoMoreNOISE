// src/pages/About.jsx
import React from "react";

const creators = [
  {
    name: "NANDINI KUMARI DAS",
    email: "nandini22das@gmail.com",
    linkedin: "https://linkedin.com/in/nandinik18das",
    skills: [
      "Python, C/C++, JavaScript, SQL",
      "Data Analysis: Pandas, NumPy, Matplotlib, Seaborn, OpenCV",
      "Web Dev: HTML, CSS, JavaScript, Next.js, Node.js, Bootstrap",
      "Databases: MySQL, MongoDB",
      "Data Visualization: Power BI, Tableau",
    ],
    achievements: [
      "Start-A-Thon: Selected among top 45+ startups all over INDIA (Creative Entrepreneurship).",
    ],
    responsibilities: [
      "MINDBENT: Co-Head of Managerial Committee",
      "Association for Computing Machinery, SVNIT: Executive",
      "Academic Affairs Council: Designer",
    ],
    projects: [
      {
        title: "Text Detection and Extraction from Image",
        desc: [
          "Developed a Python-based web app using OpenCV & Tesseract OCR for multi-language text extraction.",
          "Used Canny Edge Detection, Binarization to improve accuracy.",
          "Designed an interactive UI for real-time text extraction from uploaded images.",
        ],
      },
      {
        title: "Memory Matching Game",
        desc: [
          "Developed a Memory Game using HTML, CSS, and JavaScript.",
          "Used Fisher-Yates shuffle, move counter, and animations for better UX.",
        ],
      },
      {
        title: "Smart Fashion Closet (Virtual Wardrobe)",
        desc: [
          "React.js & Flask-based AI wardrobe app with TensorFlow for outfit recommendations.",
          "Image categorization, Firebase integration, fashion trend analysis APIs.",
        ],
      },
    ],
  },
  {
    name: "Sumit Kumar Das",
    email: "sumitdas1708@icloud.com",
    location: "Ahmedabad, Gujarat",
    github: "https://github.com/Sumit-das",
    linkedin: "https://linkedin.com/in/Sumit-das",
    leetcode: "https://leetcode.com/Sumit-das",
    skills: [
      "Languages: Python, Kotlin, Java, C++, HTML, CSS, JS",
      "Android Dev: Jetpack Compose, Android Studio, XML",
      "Frontend: Bootstrap, Tailwind, React",
      "Data Analysis: NumPy, Pandas, Matplotlib, SQL, Power BI",
      "Backend: Express, NodeJS",
    ],
    projects: [
      {
        title: "SpectraView: Satellite Image Band Visualizer",
        desc: [
          "Built with Python for analyzing multi-spectral satellite imagery.",
          "Included user input, image processing, and data visualization.",
        ],
      },
      {
        title: "Customer Churn Prediction",
        desc: [
          "Used SQL + EDA to explore telecom churn data.",
          "Built a logistic regression model with 82% accuracy.",
        ],
      },
      {
        title: "Heart Disease Prediction App",
        desc: [
          "ML-powered cross-platform mobile + web app for predicting heart risk.",
          "Includes data upload, form UI, and real-time results.",
        ],
      },
    ],
  },
];

export default function About() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Creators</h1>
      {creators.map((c, i) => (
        <section key={i} style={styles.creatorCard}>
          <h2 style={styles.name}>{c.name}</h2>
          <p>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${c.email}`} style={styles.link}>
              {c.email}
            </a>
            {c.location && <> | <strong>Location:</strong> {c.location}</>}
          </p>

          {c.github && (
            <p>
              <strong>GitHub:</strong>{" "}
              <a href={c.github} target="_blank" rel="noreferrer" style={styles.link}>
                {c.github}
              </a>
            </p>
          )}
          {c.linkedin && (
            <p>
              <strong>LinkedIn:</strong>{" "}
              <a href={c.linkedin} target="_blank" rel="noreferrer" style={styles.link}>
                {c.linkedin}
              </a>
            </p>
          )}
          {c.leetcode && (
            <p>
              <strong>LeetCode:</strong>{" "}
              <a href={c.leetcode} target="_blank" rel="noreferrer" style={styles.link}>
                {c.leetcode}
              </a>
            </p>
          )}

          {c.education && (
            <>
              <h3>Education</h3>
              <ul>
                {c.education.map((ed, idx) => (
                  <li key={idx}>{ed}</li>
                ))}
              </ul>
            </>
          )}

          {c.skills && (
            <>
              <h3>Skills</h3>
              <ul>
                {c.skills.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </>
          )}

          {c.achievements && (
            <>
              <h3>Achievements</h3>
              <ul>
                {c.achievements.map((a, idx) => (
                  <li key={idx}>{a}</li>
                ))}
              </ul>
            </>
          )}

          {c.responsibilities && (
            <>
              <h3>Positions of Responsibility</h3>
              <ul>
                {c.responsibilities.map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </>
          )}

          {c.projects && (
            <>
              <h3>Projects</h3>
              {c.projects.map((proj, idx) => (
                <div key={idx} style={{ marginBottom: 12 }}>
                  <strong>{proj.title}</strong>
                  <ul>
                    {proj.desc.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}
        </section>
      ))}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 900,
    margin: "auto",
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
  },
  title: {
    textAlign: "center",
    color: "#007bff",
    marginBottom: 30,
  },
  creatorCard: {
    marginBottom: 40,
    padding: 20,
    backgroundColor: "#f1f9ff",
    borderRadius: 12,
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },
  name: {
    color: "#004085",
    marginBottom: 8,
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
};
