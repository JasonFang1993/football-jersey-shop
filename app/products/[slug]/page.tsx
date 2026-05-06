import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, generateStaticSlugs } from "@/lib/products";
import { ProductDetailClient } from "./product-detail-client";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return generateStaticSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name,
    description: product.description.slice(0, 155),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 155),
      images: product.images[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "Jerseys", href: "/products" },
          { label: product.team, href: `/products?team=${product.team.toLowerCase().replace(/\s+/g, "-")}` },
          { label: product.name },
        ]}
        className="mb-6"
      />
      <ProductDetailClient product={product} />
    </div>
  );
}
