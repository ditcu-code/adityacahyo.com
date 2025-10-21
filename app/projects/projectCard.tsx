import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import Image from "next/image";
import { Eye } from "lucide-react";
import PlatformIcon from "../components/platformIcon";

type Variant = "featured" | "list";

type Props = {
  project: Project;
  views: number;
  variant?: Variant;
  className?: string;
};

const formatDate = (date?: string) =>
  date ? (
    <time dateTime={new Date(date).toISOString()}>
      {Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(date))}
    </time>
  ) : (
    <span>SOON</span>
  );

const Views: React.FC<{ count: number; className?: string }> = ({ count, className }) => (
  <span className={`flex items-center gap-1 text-xs ${className ?? ""}`.trim()}>
    <Eye className="w-4 h-4" /> {Intl.NumberFormat("en-US", { notation: "compact" }).format(count)}
  </span>
);

const MetaRow: React.FC<{ date?: string; views: number; variant: Variant }> = ({ date, views, variant }) => (
  <div className="flex items-center justify-between gap-2">
    <div className={variant === "featured" ? "text-xs text-zinc-100" : "text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange"}>
      {formatDate(date)}
    </div>
    <Views count={views} className={variant === "featured" ? "text-zinc-500" : "text-zinc-500"} />
  </div>
);

// Image source is provided by MDX frontmatter only (cardImage or images[0])

const PreviewImage: React.FC<{ src?: string; alt: string; dim: number; className?: string }> = ({ src, alt, dim, className }) => {
  if (!src) return null;
  return (
    <div className={`mt-4 inline-block rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/40 ${className ?? ""}`.trim()}>
      <Image
        src={src}
        alt={alt}
        width={dim}
        height={dim}
        className="object-cover"
      />
    </div>
  );
};

export const ProjectCard: React.FC<Props> = ({ project, views, variant = "list", className }) => {
  if (variant === "featured") {
    return (
      <Link href={`/projects/${project.slug}`}>
        <article className={`relative w-full h-full p-4 md:p-8 ${className ?? ""}`.trim()}>
          <MetaRow date={project.date} views={views} variant="featured" />

          <h2
            id="featured-post"
            className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display flex gap-1"
          >
            {project.title}
            <PlatformIcon project={project} />
          </h2>
          <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
            {project.description}
          </p>
          <PreviewImage src={project.cardImage ?? project.images?.[0]} alt={`${project.title} preview`} dim={160} />
          <div className="absolute bottom-4 md:bottom-8">
            <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
              Read more <span aria-hidden="true">&rarr;</span>
            </p>
          </div>
        </article>
      </Link>
    );
  }

  // list variant
  return (
    <Link href={`/projects/${project.slug}`}>
      <article className={`p-4 md:p-8 ${className ?? ""}`.trim()}>
        <MetaRow date={project.date} views={views} variant="list" />
        <h2 className="flex z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display gap-1">
          {project.title}
          <PlatformIcon project={project} />
        </h2>
        <p className="z-20 mt-4 text-xs duration-1000 text-zinc-400 group-hover:text-zinc-200">
          {project.description}
        </p>
        <PreviewImage src={project.cardImage ?? project.images?.[0]} alt={`${project.title} preview`} dim={96} />
      </article>
    </Link>
  );
};
