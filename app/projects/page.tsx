import { Redis } from "@upstash/redis";
import { allProjects, type Project } from "contentlayer/generated";
import { Card } from "../components/card";
import { Navigation } from "../components/nav";
import { ProjectCard } from "./projectCard";

const isDevelopment = process.env.NODE_ENV === "development";
const redis = isDevelopment ? null : Redis.fromEnv();

export const revalidate = 120;

const HERO_PROJECT_SLUGS = ["kelolaternak", "kohai", "cowriter"] as const;
const HERO_PROJECT_SLUG_SET = new Set<string>(HERO_PROJECT_SLUGS);
const COLUMN_COUNT = 3;

type ViewsBySlug = Record<string, number>;

function getDateValue(project: Project) {
  return project.date ? new Date(project.date).getTime() : 0;
}

function collectViews(values: (number | null)[], projects: readonly Project[]): ViewsBySlug {
  return projects.reduce<ViewsBySlug>((acc, project, index) => {
    acc[project.slug] = values[index] ?? 0;
    return acc;
  }, {});
}

function distributeProjects(projects: readonly Project[], columnCount: number) {
  return projects.reduce<Project[][]>(
    (columns, project, index) => {
      columns[index % columnCount].push(project);
      return columns;
    },
    Array.from({ length: columnCount }, () => [] as Project[])
  );
}

export default async function ProjectsPage() {
  const viewKeys = allProjects.map((project) =>
    ["pageviews", "projects", project.slug].join(":")
  );
  const viewCounts = redis
    ? ((await redis.mget(...viewKeys)) as unknown[]).map((v) =>
        typeof v === "number" ? v : v === null ? 0 : Number(v) || 0
      )
    : Array.from({ length: allProjects.length }, () => 0);
  const views = collectViews(viewCounts as (number | null)[], allProjects);

  const heroProjects = HERO_PROJECT_SLUGS.map((slug) =>
    allProjects.find((project) => project.slug === slug)
  ).filter((project): project is Project => Boolean(project));
  const [featuredProject, ...supportingProjects] = heroProjects;

  const remainingProjects = allProjects
    .filter((project) => project.published)
    .filter((project) => !HERO_PROJECT_SLUG_SET.has(project.slug))
    .sort((a, b) => getDateValue(b) - getDateValue(a));
  const projectColumns = distributeProjects(remainingProjects, COLUMN_COUNT);

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-16 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="pt-4 sm:pt-0 text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400">
            Some of the projects are from work and some are on my own time.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
          {featuredProject && (
            <Card>
              <ProjectCard
                project={featuredProject}
                views={views[featuredProject.slug] ?? 0}
                variant="featured"
              />
            </Card>
          )}

          <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
            {supportingProjects.map((project) => (
              <Card key={project.slug}>
                <ProjectCard
                  project={project}
                  views={views[project.slug] ?? 0}
                  variant="list"
                />
              </Card>
            ))}
          </div>
        </div>
        <div className="hidden w-full h-px md:block bg-zinc-800" />

        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          {projectColumns.map((column, index) => (
            <div key={index} className="grid grid-cols-1 gap-4">
              {column.map((project) => (
                <Card key={project.slug}>
                  <ProjectCard
                    project={project}
                    views={views[project.slug] ?? 0}
                    variant="list"
                  />
                </Card>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
