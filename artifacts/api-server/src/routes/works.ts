import { Router } from "express";
import { getOurWork, getWorkType } from "@workspace/sdk/abilities";
import { getJabClient } from "../lib/jab";

const router = Router();

interface WorkListItem {
  slug: string;
  title: string;
  thumbnail: string | null;
  termSlugs: string[];
  primaryTermName: string;
}

interface TermListItem {
  slug: string;
  name: string;
  count: number;
}

router.get("/works", async (_req, res, next) => {
  try {
    const client = getJabClient();
    const [workData, termData] = await Promise.all([
      getOurWork(client),
      getWorkType(client, { hide_empty: true }),
    ]);

    const works: WorkListItem[] = workData.our_work.map((w) => ({
      slug: w.slug,
      title: w.title,
      thumbnail: w.featured_image?.url ?? null,
      termSlugs: w.work.map((t) => t.slug),
      primaryTermName: w.work[0]?.name ?? "",
    }));

    const terms: TermListItem[] = termData.work_type.map((t) => ({
      slug: t.slug,
      name: t.name,
      count: t.count,
    }));

    res.json({ works, terms });
  } catch (err) {
    next(err);
  }
});

export default router;
