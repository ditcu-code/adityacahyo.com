import { Redis } from "@upstash/redis";

export async function getProjectViewCount(slug: string): Promise<number> {
  if (process.env.NODE_ENV === "development") {
    return 0;
  }

  const redis = Redis.fromEnv();
  const viewKey = ["pageviews", "projects", slug].join(":");
  const views = await redis.get<number>(viewKey);

  return views ?? 0;
}
