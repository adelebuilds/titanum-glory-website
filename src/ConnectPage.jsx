import { useEffect, useRef, useState } from "react";
import "./ConnectPage.css";

const WECHAT_ID = "wxid_5ajh7g1ag0no22";

function ConnectIcon({ name }) {
  const icons = {
    contact: <><circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0M17 8h4M19 6v4" /></>,
    whatsapp: <><path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.7a8.5 8.5 0 1 1 16.1-4.2Z" /><path d="M8.3 7.5c.2-.4.4-.4.7-.4h.4l1 2.3c.1.3 0 .5-.2.7l-.7.8c.9 1.8 2.3 3.2 4.1 4l.7-.8c.2-.2.5-.3.7-.2l2.3 1.1v.4c0 .4 0 .6-.3.8-.5.5-1.4.8-2.1.7-3.8-.6-7.2-3.7-7.7-7.5-.1-.7.4-1.5 1.1-1.9Z" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 11v5M8 8v.01M12 16v-5M12 13.2a2.2 2.2 0 0 1 4.4 0V16" /></>,
    copy: <><rect x="8" y="8" width="11" height="11" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></>,
    document: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></>,
    arrow: <path d="M5 12h14M14 7l5 5-5 5" />,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
  };

  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">{icons[name]}</svg>;
}

const actions = [
  { label: "Save Contact", href: "/titanum-glory.vcf", icon: "contact", download: true },
  { label: "WhatsApp Titanum Glory", href: "https://wa.me/60164637870", icon: "whatsapp", external: true },
  { label: "Email Us", href: "mailto:hello@titanumglory.com", icon: "mail", external: true },
  { label: "Visit Website", href: "https://www.titanumglory.com", icon: "globe", external: true },
  { label: "Adele’s LinkedIn", href: "https://www.linkedin.com/in/adeleyeoh", icon: "linkedin", external: true },
  { label: "Tommy’s LinkedIn", href: "https://www.linkedin.com/in/tommy-kho-b097b987", icon: "linkedin", external: true },
  { label: "Titanum Glory LinkedIn", href: "https://www.linkedin.com/company/titanum-glory-sdn-bhd/", icon: "linkedin", external: true },
];

const solutions = [
  "Maritime Documentation",
  "Marine Insurance",
  "Regulatory & Compliance Support",
  "AI Maritime Solutions — Coming Soon",
];

function ConnectPage() {
  const [copyMessage, setCopyMessage] = useState("");
  const clearMessageTimer = useRef(null);

  useEffect(() => {
    document.title = "Connect with Titanum Glory | Maritime Solutions Malaysia";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Save Titanum Glory’s contact details or connect with our maritime solutions team in Malaysia.");
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", "https://www.titanumglory.com/connect");
    return () => window.clearTimeout(clearMessageTimer.current);
  }, []);

  async function copyWeChatId() {
    try {
      await navigator.clipboard.writeText(WECHAT_ID);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = WECHAT_ID;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
    }
    setCopyMessage("WeChat ID copied.");
    window.clearTimeout(clearMessageTimer.current);
    clearMessageTimer.current = window.setTimeout(() => setCopyMessage(""), 2400);
  }

  return (
    <div className="connect-page">
      <a className="connect-skip-link" href="#connect-main">Skip to main content</a>
      <header className="connect-hero">
        <div className="connect-orbit connect-orbit-one" aria-hidden="true" />
        <div className="connect-orbit connect-orbit-two" aria-hidden="true" />
        <div className="connect-shell connect-hero-inner">
          <a className="connect-brand" href="/" aria-label="Titanum Glory home">
            <span className="connect-brand-mark"><ConnectIcon name="compass" /></span>
            <span>Titanum <b>Glory</b></span>
          </a>
          <div className="connect-identity">
            <p className="connect-eyebrow">Malaysia · Maritime</p>
            <h1>Titanum Glory<br /><span>Sdn Bhd</span></h1>
            <p>Maritime Solutions for Shipping Companies Operating in Malaysia</p>
          </div>
        </div>
      </header>

      <main id="connect-main">
        <section className="connect-actions-section" aria-labelledby="connect-actions-title">
          <div className="connect-shell">
            <p className="connect-section-label" id="connect-actions-title">Connect with us</p>
            <div className="connect-actions">
              {actions.map((action, index) => (
                <a className={`connect-action${index === 0 ? " connect-action-primary" : ""}`} href={action.href} key={action.label}
                  download={action.download ? "Titanum-Glory.vcf" : undefined} target={action.external ? "_blank" : undefined}
                  rel={action.external ? "noopener noreferrer" : undefined}
                  aria-label={action.external ? `${action.label} (opens in a new tab)` : action.label}>
                  <span className="connect-action-icon"><ConnectIcon name={action.icon} /></span>
                  <span>{action.label}</span><ConnectIcon name="arrow" />
                </a>
              ))}
              <button className="connect-action" type="button" onClick={copyWeChatId} aria-describedby="copy-status">
                <span className="connect-action-icon"><ConnectIcon name="copy" /></span>
                <span>Copy WeChat ID</span><ConnectIcon name="copy" />
              </button>
            </div>
            <p className={`connect-copy-status${copyMessage ? " is-visible" : ""}`} id="copy-status" role="status" aria-live="polite">{copyMessage}</p>
          </div>
        </section>

        <section className="connect-about" aria-labelledby="connect-about-title">
          <div className="connect-shell connect-about-inner">
            <div><p className="connect-section-label">About Titanum Glory</p><h2 id="connect-about-title">Practical maritime support, built around your operation.</h2></div>
            <p className="connect-about-copy">Titanum Glory is a Malaysia-based maritime solutions company supporting shipping companies operating in Malaysia through maritime documentation, regulatory and compliance support, marine insurance and practical operational solutions.</p>
          </div>
        </section>

        <section className="connect-solutions" aria-labelledby="connect-solutions-title">
          <div className="connect-shell">
            <p className="connect-section-label">What we do</p><h2 id="connect-solutions-title">Our Solutions</h2>
            <div className="connect-solutions-grid">
              {solutions.map((solution, index) => <article className="connect-solution-card" key={solution}><span>0{index + 1}</span><h3>{solution}</h3></article>)}
            </div>
          </div>
        </section>

        <section className="connect-profile" aria-labelledby="connect-profile-title">
          <div className="connect-shell connect-profile-inner">
            <div><p className="connect-section-label">Learn more</p><h2 id="connect-profile-title">Company Profile</h2></div>
            {/* TODO: Replace this placeholder path when the final company profile PDF is added to /public. */}
            <a className="connect-profile-button" href="/company-profile.pdf" download><ConnectIcon name="document" /><span>Download Company Profile</span><ConnectIcon name="arrow" /></a>
          </div>
        </section>
      </main>

      <footer className="connect-footer">
        <div className="connect-shell">
          <div className="connect-footer-heading"><span className="connect-brand-mark"><ConnectIcon name="compass" /></span><div><b>Titanum Glory Sdn Bhd</b><span>Port Klang, Malaysia</span></div></div>
          <dl className="connect-contact-list">
            <div><dt>WhatsApp</dt><dd><a href="https://wa.me/60164637870" target="_blank" rel="noopener noreferrer">+60 16-463 7870</a></dd></div>
            <div><dt>Email</dt><dd><a href="mailto:hello@titanumglory.com" target="_blank" rel="noopener noreferrer">hello@titanumglory.com</a></dd></div>
            <div><dt>Website</dt><dd><a href="https://www.titanumglory.com" target="_blank" rel="noopener noreferrer">www.titanumglory.com</a></dd></div>
            <div><dt>WeChat ID</dt><dd>{WECHAT_ID}</dd></div>
          </dl>
          <p className="connect-copyright">© {new Date().getFullYear()} Titanum Glory Sdn Bhd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default ConnectPage;
