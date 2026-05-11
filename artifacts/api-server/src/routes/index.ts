import { Router, type IRouter } from "express";
import healthRouter from "./health";
import postsRouter from "./posts";
import worksRouter from "./works";

const router: IRouter = Router();

router.use(healthRouter);
router.use(postsRouter);
router.use(worksRouter);

export default router;
