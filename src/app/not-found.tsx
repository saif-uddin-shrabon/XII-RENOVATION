import Link from "next/link";
import { services, servicePath } from "@/data/services";
import ui from "@/components/ui/ui.module.css";

export default function NotFound() {
  return (
    <main id="main-content" className={`${ui.section} ${ui.sectionDark}`} style={{ paddingTop: "10rem", flex: 1 }}>
      <div className={ui.sectionContainer}>
        <div className={ui.sectionHeader}>
          <p className={ui.eyebrow}>Page not found</p>
          <h1 className={ui.sectionTitle}>We could not find that page</h1>
          <p className={ui.sectionSubtitle}>
            Try one of our renovation services below, or head back to the homepage.
          </p>
        </div>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            justifyContent: "center",
          }}
        >
          <li>
            <Link href="/" className={ui.primaryBtn}>
              Homepage
            </Link>
          </li>
          {services.map((service) => (
            <li key={service.slug}>
              <Link href={servicePath(service.slug)} className={ui.secondaryBtn}>
                {service.navLabel}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
