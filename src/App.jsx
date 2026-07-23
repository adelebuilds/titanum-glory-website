import { useEffect, useState } from "react";
import "./App.css";
import cargoHero from "./assets/cargo-hero.png";
import portOperations from "./assets/port-operations.png";
import documentation from "./assets/documentation.png";
import professionalTeam from "./assets/professional-team.png";
import maritimeServices from "./assets/maritime-services.png";

function Icon({ name }) {
  const paths = {
    bolt: <path d="M13 2 5 13h6l-1 9 8-12h-6l1-8Z" />,
    document: (
      <>
        <path d="M7 3h8l4 4v14H5V3h2Z" />
        <path d="M14 3v5h5M8.5 13h7M8.5 17h5" />
      </>
    ),
    headset: (
      <>
        <path d="M4 13v-2a8 8 0 0 1 16 0v2" />
        <path d="M4 13a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2v-2ZM20 13a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2ZM17 19c-1.2 1.3-2.9 2-5 2" />
      </>
    ),
    certificate: (
      <>
        <circle cx="12" cy="9" r="6" />
        <path d="m8.5 14-1 8 4.5-2 4.5 2-1-8M9.5 9l1.7 1.7L15 7" />
      </>
    ),
    anchor: (
      <>
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v14M5 11H2m20 0h-3M4 14a8 8 0 0 0 16 0M8 21h8" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 4v2" />
      </>
    ),
    shield: (
      <>
        <path d="M12 2 20 5v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5l8-3Z" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </>
    ),
    arrow: <path d="M5 12h14M14 7l5 5-5 5" />,
    compass: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
      </>
    ),
    route: (
      <>
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="6" r="2" />
        <path d="M8 18h2a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2h2M7.5 6H3v4.5M3.5 10A8.5 8.5 0 0 1 12 3" />
      </>
    ),
    vessel: (
      <>
        <path d="M3 15h18l-2.5 4H6L3 15Z" />
        <path d="M7 15V8h10v7M10 8V5h4v3M3 21c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0" />
      </>
    ),
    idCard: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <circle cx="8" cy="11" r="2" />
        <path d="M5.5 16c.5-1.6 1.3-2.5 2.5-2.5s2 .9 2.5 2.5M13 10h5M13 14h4" />
      </>
    ),
    medical: (
      <>
        <path d="M5 4h11l3 3v13H5V4Z" />
        <path d="M15 4v4h4M9 12h6M12 9v6" />
      </>
    ),
    education: (
      <>
        <path d="m3 9 9-5 9 5-9 5-9-5Z" />
        <path d="M7 12v4c2.8 2 7.2 2 10 0v-4M21 9v6" />
      </>
    ),
    stamp: (
      <>
        <path d="M8 14h8l-1.5-3a5.5 5.5 0 0 1 0-5A2.7 2.7 0 0 0 12 2a2.7 2.7 0 0 0-2.5 4 5.5 5.5 0 0 1 0 5L8 14Z" />
        <path d="M5 14h14v4H5zM7 22h10" />
      </>
    ),
    courier: (
      <>
        <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path d="M5 4h7" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const services = [
  {
    number: "01",
    icon: "idCard",
    title: "MSID (Malaysian Seafarer's Identity Document)",
    copy: "Support for Malaysian Seafarer's Identity Document applications and documentation.",
  },
  {
    number: "02",
    icon: "certificate",
    title: "Certificate of Recognition (COR)",
    copy: "Support for Certificate of Recognition documentation and applications.",
  },
  {
    number: "03",
    icon: "education",
    title: "EDUCOR",
    copy: "Support for EDUCOR documentation and applications.",
  },
  {
    number: "04",
    icon: "stamp",
    title: "GOC Endorsement",
    copy: "Support for GOC Endorsement documentation and applications.",
  },
  {
    number: "05",
    icon: "medical",
    title: "Medical Booklet Procurement",
    copy: "Support for medical booklet procurement and related documentation.",
  },
  {
    number: "06",
    icon: "document",
    title: "Malaysian Maritime Documentation Support",
    copy: "Professional support for Malaysian maritime documentation requirements.",
  },
];

function ServicesSection() {
  return (
    <section className="services section-dark" id="services" aria-labelledby="services-title">
      <div className="section-orbit" aria-hidden="true" />
      <div className="section-shell">
        <div className="section-heading section-heading-split" data-reveal>
          <div>
            <p className="section-label section-label-light">Specialist documentation support</p>
            <h2 id="services-title">Our Services</h2>
          </div>
          <div className="services-intro">
            <p>Focused assistance for seafarer documentation, certificate recognition and document coordination.</p>
            <span>Professional · Responsive · Precise</span>
          </div>
        </div>

        <div className="services-showcase">
          <figure className="services-visual image-frame" data-reveal>
            <img src={maritimeServices} alt="Maritime charts and documentation overlooking an international container port" loading="lazy" />
            <div className="services-visual-shade" />
            <figcaption>
              <span className="visual-kicker"><Icon name="compass" /> Maritime documentation</span>
              <p>Clear support for every document journey.</p>
              <div className="visual-meta">
                <span><b>01</b> Document preparation</span>
                <span><b>02</b> Careful coordination</span>
              </div>
            </figcaption>
          </figure>

          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title} data-reveal>
                <div className="service-card-top">
                  <span className="service-number">{service.number}</span>
                  <div className="card-icon card-icon-dark"><Icon name={service.icon} /></div>
                </div>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <a href="#contact" aria-label={`Enquire about ${service.title}`}>
                  Enquire about this service <Icon name="arrow" />
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="services-footer" data-reveal>
          <p><span>Need assistance?</span> Tell us which service you require.</p>
          <a className="button button-primary" href="#contact">Speak with our team <Icon name="arrow" /></a>
        </div>
      </div>
    </section>
  );
}

const reasons = [
  {
    icon: "anchor",
    title: "Malaysian Maritime Focus",
    copy: "Supporting clients with Malaysian maritime documentation and regulatory coordination.",
  },
  {
    icon: "route",
    title: "International Client Support",
    copy: "Professional support for shipping companies, ship managers, crewing agencies, manning agencies and offshore marine companies.",
  },
  {
    icon: "headset",
    title: "Personalised Service",
    copy: "Clear communication, attentive coordination and practical support throughout each engagement.",
  },
  {
    icon: "document",
    title: "Careful Documentation Handling",
    copy: "A structured and professional approach to document preparation, review and coordination.",
  },
];

function WhyChooseSection() {
  return (
    <section className="why-choose section-light" aria-labelledby="why-choose-title">
      <div className="why-choose-watermark" aria-hidden="true"><Icon name="compass" /></div>
      <div className="section-shell">
        <div className="why-choose-heading" data-reveal>
          <div>
            <p className="section-label">A dependable partnership</p>
            <h2 id="why-choose-title">Why Choose Titanum Glory</h2>
          </div>
          <p>Focused maritime knowledge, thoughtful coordination and service shaped around every client requirement.</p>
        </div>

        <div className="why-choose-grid">
          {reasons.map((reason, index) => (
            <article className="why-card" key={reason.title} data-reveal>
              <div className="why-card-header">
                <span>0{index + 1}</span>
                <div className="why-icon"><Icon name={reason.icon} /></div>
              </div>
              <h3>{reason.title}</h3>
              <p>{reason.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SupportCta() {
  return (
    <section
      className="support-cta"
      aria-labelledby="support-cta-title"
      style={{ "--support-image": `url(${portOperations})` }}
    >
      <div className="support-cta-lines" aria-hidden="true" />
      <div className="section-shell support-cta-inner" data-reveal>
        <span className="support-cta-icon"><Icon name="compass" /></span>
        <h2 id="support-cta-title">Need support with Malaysian maritime documentation?</h2>
        <p>Speak with Titanum Glory about your documentation requirements.</p>
        <div className="support-cta-actions">
          <a className="button button-primary" href="#contact">Contact Us <Icon name="arrow" /></a>
          <a className="button button-secondary" href="#services">View Our Services</a>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [submission, setSubmission] = useState({ status: "idle", message: "Your details will be handled with care and used only to respond to your enquiry." });

  async function handleEnquirySubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const requiredFields = ["name", "email", "country", "service", "message"];

    for (const fieldName of requiredFields) {
      const field = form.elements.namedItem(fieldName);
      const isBlank = !String(formData.get(fieldName) || "").trim();
      field.setCustomValidity(isBlank ? "Please complete this required field." : "");
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setSubmission({ status: "submitting", message: "Sending your enquiry…" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "We could not send your enquiry. Please try again shortly.");
      }

      form.reset();
      setSubmission({
        status: "success",
        message: "Thank you. Your enquiry has been sent successfully, and our team will be in touch soon.",
      });
    } catch (error) {
      setSubmission({
        status: "error",
        message: error.message || "We could not send your enquiry. Please try again shortly.",
      });
    }
  }

  function clearFieldError(event) {
    event.currentTarget.setCustomValidity("");
  }

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-orbit" aria-hidden="true" />
      <div className="section-shell contact-layout">
        <div className="contact-introduction" data-reveal>
          <p className="section-label">Start a conversation</p>
          <h2 id="contact-title">Let’s discuss your maritime documentation requirements.</h2>
          <p>Tell us what support you require, and our team will respond with the appropriate next steps.</p>
          <div className="contact-note">
            <Icon name="compass" />
            <span>Professional support for maritime documentation requirements.</span>
          </div>
        </div>

        <form className="enquiry-form" onSubmit={handleEnquirySubmit} data-reveal>
          <div className="form-heading">
            <span>Enquiry form</span>
            <small>Required fields are marked *</small>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="name">Name *</label>
              <input id="name" name="name" type="text" autoComplete="name" maxLength="100" onInput={clearFieldError} required />
            </div>

            <div className="form-field">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" type="text" autoComplete="organization" maxLength="120" />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email *</label>
              <input id="email" name="email" type="email" autoComplete="email" maxLength="254" onInput={clearFieldError} required />
            </div>

            <div className="form-field">
              <label htmlFor="country">Country *</label>
              <input id="country" name="country" type="text" autoComplete="country-name" maxLength="100" onInput={clearFieldError} required />
            </div>

            <div className="form-field form-field-wide">
              <label htmlFor="service">Service required *</label>
              <select id="service" name="service" defaultValue="" onInput={clearFieldError} required>
                <option value="" disabled>Select a service</option>
                {services.map((service) => (
                  <option value={service.title} key={service.title}>{service.title}</option>
                ))}
              </select>
            </div>

            <div className="form-field form-field-wide">
              <label htmlFor="message">Message *</label>
              <textarea id="message" name="message" rows="6" maxLength="5000" onInput={clearFieldError} required />
            </div>

            <input name="website" type="text" tabIndex="-1" autoComplete="off" hidden aria-hidden="true" />
          </div>

          <div className="form-actions">
            <p role="status" aria-live="polite">{submission.message}</p>
            <button className="button button-primary" type="submit" disabled={submission.status === "submitting"}>
              {submission.status === "submitting" ? "Sending enquiry" : "Submit enquiry"} <Icon name="arrow" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function App() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site">
      <header className="header">
        <a className="brand" href="#home" aria-label="Titanum Glory home">
          <span className="brand-mark"><Icon name="compass" /></span>
          <span>Titanum <b>Glory</b></span>
        </a>

        <nav className="navigation" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="header-contact" href="#contact">
          Start a conversation <Icon name="arrow" />
        </a>
      </header>

      <main>
        <section
          className="hero"
          id="home"
          style={{ "--hero-image": `url(${cargoHero})` }}
        >
          <div className="hero-grid-lines" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow">Malaysian Maritime Documentation</p>
            <h1>
              Trusted documentation support for the international maritime
              industry.
            </h1>
            <p className="hero-description">
              Titanum Glory supports shipping companies, ship managers,
              crewing agencies, manning agencies and offshore marine companies
              with professional Malaysian maritime documentation and
              regulatory support.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                Contact Us <Icon name="arrow" />
              </a>
              <a className="button button-secondary" href="#services">
                Explore Our Services
              </a>
            </div>
          </div>
          <div className="hero-footnote">
            <span>Malaysia</span>
            <span className="hero-footnote-line" />
            <span>Serving the global maritime industry</span>
          </div>
        </section>

        <section className="about section-light" id="about" aria-labelledby="about-title">
          <div className="section-shell">
            <div className="about-introduction" data-reveal>
              <div>
                <p className="section-label">About Titanum Glory</p>
                <h2 id="about-title">About Titanum Glory</h2>
              </div>
              <div className="about-copy">
                <p>
                  Titanum Glory Sdn. Bhd. is a Malaysian maritime documentation
                  specialist supporting shipping companies, ship managers,
                  crewing agencies, manning agencies and offshore marine
                  companies.
                </p>
                <p>
                  We provide reliable assistance for Malaysian maritime
                  documentation, helping clients navigate documentation
                  requirements accurately, professionally and efficiently.
                </p>
              </div>
            </div>

            <div className="image-purpose-grid" data-reveal>
              <figure className="about-image image-frame">
                <img src={portOperations} alt="Modern cargo vessel at an international container port" />
                <figcaption><span>Malaysian maritime documentation</span> Accurate, professional and efficient assistance.</figcaption>
              </figure>
              <div className="purpose-stack">
                <article className="purpose-card">
                  <span className="purpose-number">Who we support</span>
                  <p>Shipping companies, ship managers and crewing agencies.</p>
                </article>
                <article className="purpose-card purpose-card-dark">
                  <span className="purpose-number">Who we support</span>
                  <p>Manning agencies and offshore marine companies.</p>
                </article>
              </div>
            </div>

            <div className="feature-grid" aria-label="Our focus">
              <article className="feature-card" data-reveal>
                <div className="card-icon"><Icon name="shield" /></div>
                <h3>Professional service</h3>
              </article>
              <article className="feature-card" data-reveal>
                <div className="card-icon"><Icon name="headset" /></div>
                <h3>Prompt communication</h3>
              </article>
              <article className="feature-card" data-reveal>
                <div className="card-icon"><Icon name="document" /></div>
                <h3>Accurate documentation</h3>
              </article>
              <article className="feature-card" data-reveal>
                <div className="card-icon"><Icon name="users" /></div>
                <h3>Long-term client relationships</h3>
              </article>
            </div>
          </div>
        </section>

        <section className="expertise section-white" aria-labelledby="expertise-title">
          <div className="section-shell expertise-grid">
            <div className="expertise-copy" data-reveal>
              <p className="section-label">Documentation Expertise</p>
              <h2 id="expertise-title">Complex requirements, made clear.</h2>
              <p className="lead-copy">Maritime documentation demands accuracy and close attention. Our process is designed to bring calm, clarity and momentum to every engagement.</p>
              <ol className="process-list">
                <li><span>01</span><div><h3>Review</h3><p>We understand your requirement and assess the documentation needed.</p></div></li>
                <li><span>02</span><div><h3>Prepare</h3><p>Our team coordinates, checks and prepares each submission carefully.</p></div></li>
                <li><span>03</span><div><h3>Support</h3><p>We keep you informed and provide personal guidance through completion.</p></div></li>
              </ol>
            </div>
            <figure className="expertise-image image-frame" data-reveal>
              <img src={documentation} alt="Maritime professional reviewing vessel documentation" loading="lazy" />
              <div className="image-badge"><Icon name="shield" /><span><b>Carefully reviewed</b>Documentation you can trust</span></div>
            </figure>
          </div>
        </section>

        <ServicesSection />

        <WhyChooseSection />

        <section className="partnership section-soft" aria-labelledby="partnership-title">
          <div className="section-shell partnership-grid">
            <figure className="partnership-image image-frame" data-reveal>
              <img src={professionalTeam} alt="Maritime professionals collaborating in a harbour office" loading="lazy" />
            </figure>
            <div className="partnership-copy" data-reveal>
              <p className="section-label">A Personal Partnership</p>
              <h2 id="partnership-title">International standards. Human support.</h2>
              <p>Behind every document is an operation, a vessel and a team relying on it. That is why our service remains direct, responsive and personal from beginning to end.</p>
              <blockquote>“Professional support should feel precise, dependable and effortless.”</blockquote>
              <a className="text-link" href="#contact">Meet your documentation partner <Icon name="arrow" /></a>
            </div>
          </div>
        </section>

        <SupportCta />

        <ContactSection />
      </main>

      <footer className="footer">
        <div className="section-shell footer-inner">
          <div className="footer-identity">
            <a href="#home">Titanum Glory Sdn Bhd</a>
            <p>Malaysian maritime documentation and regulatory support.</p>
          </div>
          <nav className="footer-navigation" aria-label="Footer navigation">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </nav>
          <p className="copyright">© {new Date().getFullYear()} Titanum Glory Sdn Bhd</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
