import { notFound, redirect } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

const certificateMap: Record<string, string> = {
  ada: "/pdf/cert-ada-adityac.pdf",
  glints: "/images/cert-glints-adityac.png",
  hack4id: "/pdf/cert-hack4id-adityac.pdf",
  hacksprint: "/pdf/cert-hacksprint-adityac.pdf",
};

export async function generateStaticParams(): Promise<Props["params"][]> {
  return Object.keys(certificateMap).map((slug) => ({ slug }));
}

export default async function CertificatePage({ params }: Props) {
  const { slug } = params;

  // Redirect to the corresponding certificate file or show 404 if not found
  if (certificateMap[slug]) {
    redirect(certificateMap[slug]);
  } else {
    notFound();
  }
}
