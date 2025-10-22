import { Mdx } from "@/app/components/mdx";
import { Redis } from "@upstash/redis";
import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Header } from "../header";
import "../mdx.css";
import { ReportView } from "../view";

type Props = {
  params: {
    slug: string;
    detail: string;
  };
};

const isDevelopment = process.env.NODE_ENV === "development";
const redis = isDevelopment ? null : Redis.fromEnv();

export const revalidate = 60;

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
      detail: p.slug,
    }));
}

export default async function DetailPage({ params }: Props) {
  const slug = params?.slug;
  const detail = params.detail;
  const project = allProjects.find((project) => project.detail === detail);

  if (!project) {
    notFound();
  }

  const backLink = project.path.substring(0, project.path.lastIndexOf("/"));
  const views = redis
    ? (await redis.get<number>(["pageviews", "projects", slug].join(":"))) ??
      0
    : 0;

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header project={project} backLink={backLink} views={views} />
      <ReportView slug={project.slug} />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={project.body.code} />
      </article>
    </div>
  );
}
