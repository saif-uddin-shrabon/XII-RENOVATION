import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "@/lib/site";
import ui from "@/components/ui/ui.module.css";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How XIII Renovation & Design collects and uses enquiry details, WhatsApp messages, and website analytics in Singapore.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "20 November 2026";

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" className={styles.page}>
      <div className={styles.inner}>
        <p className={ui.eyebrow}>Legal</p>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.meta}>
          {BUSINESS.name} (UEN {BUSINESS.uen})
          <br />
          {BUSINESS.address.street}, {BUSINESS.address.locality}{" "}
          {BUSINESS.address.postalCode}
          <br />
          Last updated: {LAST_UPDATED}
        </p>

        <section className={styles.section} aria-labelledby="collect-heading">
          <h2 id="collect-heading">What we collect</h2>
          <p>When you message or call us, we receive:</p>
          <ul>
            <li>Your name and phone number</li>
            <li>Your email, if you give it</li>
            <li>A short description of your job and your home type</li>
            <li>Any photos you send</li>
          </ul>
          <p>On this website, Google tools also collect:</p>
          <ul>
            <li>Pages you view and buttons you tap</li>
            <li>Device and browser details</li>
            <li>A cookie that links your visit to a Google ad you clicked</li>
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="why-heading">
          <h2 id="why-heading">Why we use it</h2>
          <ul>
            <li>To reply to your enquiry and give a quote</li>
            <li>To arrange a site visit</li>
            <li>To measure which ads bring real enquiries</li>
            <li>To improve this website</li>
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="whatsapp-heading">
          <h2 id="whatsapp-heading">WhatsApp and the enquiry form</h2>
          <p>
            The form does not store your details on this website. It opens WhatsApp
            with your message filled in. When you send it, WhatsApp handles the
            message under its own privacy policy.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="analytics-heading">
          <h2 id="analytics-heading">Analytics and Google Ads</h2>
          <p>
            We use Google Analytics and Google Ads conversion tracking. They use
            cookies to count visits and to see whether a click on our ad led to a
            tap on WhatsApp or the phone button. You can block cookies in your
            browser settings.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="share-heading">
          <h2 id="share-heading">Who we share it with</h2>
          <ul>
            <li>Google, for the tools above</li>
            <li>WhatsApp, if you message us there</li>
            <li>No one else, and we do not sell your details</li>
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="stored-heading">
          <h2 id="stored-heading">Where it is stored</h2>
          <p>
            Google and WhatsApp may handle data on servers outside Singapore.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="keep-heading">
          <h2 id="keep-heading">How long we keep it</h2>
          <p>
            We keep enquiry details only as long as needed to handle your job and
            any follow-up, then remove them from our records.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="marketing-heading">
          <h2 id="marketing-heading">Marketing messages</h2>
          <p>
            We only contact you about your enquiry. We do not send marketing
            messages unless you ask us to.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="choices-heading">
          <h2 id="choices-heading">Your choices</h2>
          <p>
            You can ask to see, correct or delete the details we hold about you,
            or withdraw your consent, by contacting us at{" "}
            <a href={`mailto:${BUSINESS.primaryEmail}`}>{BUSINESS.primaryEmail}</a>{" "}
            or{" "}
            <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="changes-heading">
          <h2 id="changes-heading">Changes</h2>
          <p>We will post any change on this page.</p>
        </section>

        <p className={styles.back}>
          <Link href="/">Back to homepage</Link>
        </p>
      </div>
    </main>
  );
}
