import { Mdx } from "@/app/components/mdx";
import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { getProjectViewCount } from "./view-count";

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 60;

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find((candidate) => candidate.slug === slug);

  if (!project) {
    notFound();
  }

  const views = await getProjectViewCount(project.slug);

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header project={project} backLink="/projects" views={views} />
      <ReportView slug={project.slug} />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={project.body.code} />
      </article>
    </div>
  );
}
