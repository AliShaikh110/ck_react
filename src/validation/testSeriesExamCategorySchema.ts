import { z } from "zod";

export const TestExamSchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    order: z.number().nullable().optional(),
    testSeriesExams: z.number().nullable().optional(),
    isActive: z.boolean(),
});

export type TestSeriesExamType = z.infer<typeof TestExamSchema>;
