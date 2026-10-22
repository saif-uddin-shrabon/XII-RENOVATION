import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceBySlug, servicePath, services } from "@/data/services";
import { HERO_IMAGE } from "@/data/projects";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }));
}

type ServiceRouteProps = {
  params: Promise<{ service: string }>;
};

export async function generateMetadata({ params }: ServiceRouteProps): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const path = servicePath(service.slug);
  const image = service.photos[0] ?? HERO_IMAGE;

  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: path },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: path,
      type: "website",
      images: [
        {
          url: image.src,
          width: image.width,
          height: image.height,
          alt: image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: [image.src],
    },
  };
}

export default async function ServicePage({ params }: ServiceRouteProps) {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <ServicePageTemplate service={service} />
      <JsonLd data={[serviceJsonLd(service), faqJsonLd(service), breadcrumbJsonLd(service)]} />
    </>
  );
}
