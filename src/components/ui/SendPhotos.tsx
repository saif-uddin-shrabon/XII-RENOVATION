import { WHATSAPP_REPLY_TIME, whatsAppLink } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";
import styles from "./SendPhotos.module.css";

interface SendPhotosProps {
  message: string;
  /** Mid-sentence service name, e.g. "kitchen renovation" */
  serviceName?: string;
  className?: string;
}

const STEPS = [
  { title: "Take 3–4 photos", text: "Wide shots of the space, plus close-ups of anything damaged or old." },
  { title: "Send them on WhatsApp", text: "Add your flat type and what you want done. A rough idea is enough." },
  { title: "Get a reply, then a free visit", text: "We reply with next steps and book a free site visit for your quote." },
];

/** The fastest path to a quote: photos over WhatsApp. Lowers the effort of the first message. */
export default function SendPhotos({ message, serviceName, className }: SendPhotosProps) {
  return (
    <div className={`${styles.panel} ${className ?? ""}`} data-track-location="send-photos">
      <div className={styles.intro}>
        <p className={styles.kicker}>Fastest way to a quote</p>
        <h3 className={styles.title}>
          Send photos{serviceName ? ` of your ${serviceName}` : ""} on WhatsApp
        </h3>
        <p className={styles.reply}>
          <span className={styles.dot} aria-hidden="true" />
          {WHATSAPP_REPLY_TIME}
        </p>
      </div>
      <ol className={styles.steps}>
        {STEPS.map((step, index) => (
          <li key={step.title}>
            <span className={styles.stepNumber} aria-hidden="true">
              {index + 1}
            </span>
            <span>
              <strong>{step.title}</strong>
              <small>{step.text}</small>
            </span>
          </li>
        ))}
      </ol>
      <a
        href={whatsAppLink(`${message} I'll send photos of the space.`)}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.button}
      >
        <WhatsAppIcon size={20} />
        Send photos now
      </a>
    </div>
  );
}
