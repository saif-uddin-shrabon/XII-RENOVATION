"use client";

import { useState } from "react";
import { services } from "@/data/services";
import { BUSINESS, buildEnquiryWhatsAppUrl } from "@/lib/site";
import { trackLead } from "@/lib/analytics";
import styles from "./EnquiryForm.module.css";

const OTHER_SERVICE = "Other / not sure yet";

const PROPERTY_TYPES = [
  "HDB BTO Flat",
  "HDB Resale Flat",
  "Condominium",
  "Landed Property",
  "Commercial Space",
] as const;

interface EnquiryFormProps {
  defaultService?: string;
}

function emptyForm(defaultService?: string) {
  return {
    name: "",
    email: "",
    phone: "",
    propertyType: PROPERTY_TYPES[0] as string,
    service: defaultService ?? OTHER_SERVICE,
    message: "",
  };
}

export default function EnquiryForm({ defaultService }: EnquiryFormProps) {
  const [formData, setFormData] = useState(() => emptyForm(defaultService));
  const [formError, setFormError] = useState<string | null>(null);
  const [whatsAppUrl, setWhatsAppUrl] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const message = formData.message.trim();

    if (!name || !phone || !message) {
      setFormError("Please fill in your name, phone number, and a short description of the job.");
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please enter a valid email address, or leave it blank.");
      return;
    }

    const url = buildEnquiryWhatsAppUrl({
      ...formData,
      name,
      email: email || "-",
      phone,
      message,
    });

    setFormError(null);
    setWhatsAppUrl(url);
    trackLead("enquiry_form", { service: formData.service, property_type: formData.propertyType });
    window.open(url, "_blank", "noopener,noreferrer");
    setFormData(emptyForm(defaultService));
  };

  return (
    <div className={styles.formArea}>
      <h3 className={styles.formTitle}>Request a Quotation</h3>
      <p className={styles.formHint}>
        This opens WhatsApp with your details — we do not store the form on this site. Prefer
        call or email? Use the contact details alongside.
      </p>

      {whatsAppUrl ? (
        <div className={styles.successMessage} role="status" aria-live="polite">
          <strong>WhatsApp should be opening now.</strong>
          <p>
            If nothing happened, message us on WhatsApp or call{" "}
            <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>.
          </p>
          <div className={styles.successActions}>
            <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
              Open WhatsApp again
            </a>
            <a href={`mailto:${BUSINESS.primaryEmail}`}>Email sales</a>
            <button
              type="button"
              className={styles.formSubmitBtn}
              onClick={() => setWhatsAppUrl(null)}
            >
              Send another enquiry
            </button>
          </div>
        </div>
      ) : (
        <form className={styles.contactForm} onSubmit={handleFormSubmit} noValidate>
          {formError && (
            <p className={styles.formError} role="alert">
              {formError}
            </p>
          )}

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="enquiry-name">
                Your Name
              </label>
              <input
                type="text"
                id="enquiry-name"
                name="name"
                required
                maxLength={80}
                autoComplete="name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="e.g. Johnathan Tan"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="enquiry-phone">
                Phone (WhatsApp)
              </label>
              <input
                type="tel"
                id="enquiry-phone"
                name="phone"
                required
                maxLength={30}
                autoComplete="tel"
                inputMode="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="e.g. +65 9123 4567"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="enquiry-email">
              Email (optional)
            </label>
            <input
              type="email"
              id="enquiry-email"
              name="email"
              maxLength={120}
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
              className={styles.formInput}
              placeholder="e.g. johnathan@example.com"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="enquiry-service">
                Service Needed
              </label>
              <select
                id="enquiry-service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className={styles.formInput}
              >
                {services.map((service) => (
                  <option key={service.slug} value={service.navLabel}>
                    {service.navLabel}
                  </option>
                ))}
                <option value={OTHER_SERVICE}>{OTHER_SERVICE}</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="enquiry-property">
                Property Type
              </label>
              <select
                id="enquiry-property"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                className={styles.formInput}
              >
                {PROPERTY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="enquiry-message">
              Job Description & Scope
            </label>
            <textarea
              id="enquiry-message"
              name="message"
              rows={4}
              required
              maxLength={1200}
              value={formData.message}
              onChange={handleInputChange}
              className={styles.formInput}
              placeholder="e.g. 4-room resale flat, new kitchen cabinets and re-tiling, keys in March"
            />
          </div>

          <button type="submit" className={styles.formSubmitBtn}>
            Continue on WhatsApp
          </button>
        </form>
      )}
    </div>
  );
}
