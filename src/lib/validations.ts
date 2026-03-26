import { z } from "zod";

const elementBaseSchema = z.object({
  color: z.string().max(20).optional(),
  strokeWidth: z.number().positive().max(20).optional(),
});

const lineElementSchema = elementBaseSchema.extend({
  type: z.literal("line"),
  x1: z.number(), y1: z.number(), x2: z.number(), y2: z.number(),
});

const rectElementSchema = elementBaseSchema.extend({
  type: z.literal("rect"),
  x: z.number(), y: z.number(), w: z.number(), h: z.number(),
});

const circleElementSchema = elementBaseSchema.extend({
  type: z.literal("circle"),
  cx: z.number(), cy: z.number(), r: z.number().positive(),
});

const arcElementSchema = elementBaseSchema.extend({
  type: z.literal("arc"),
  cx: z.number(), cy: z.number(), r: z.number().positive(),
  startAngle: z.number(), endAngle: z.number(),
});

const arrowElementSchema = elementBaseSchema.extend({
  type: z.literal("arrow"),
  x1: z.number(), y1: z.number(), x2: z.number(), y2: z.number(),
});

const textElementSchema = elementBaseSchema.extend({
  type: z.literal("text"),
  x: z.number(), y: z.number(),
  text: z.string().max(500),
  fontSize: z.number().positive().max(200).optional(),
});

const dashedElementSchema = elementBaseSchema.extend({
  type: z.literal("dashed"),
  x1: z.number(), y1: z.number(), x2: z.number(), y2: z.number(),
  dashLength: z.number().positive().optional(),
  gapLength: z.number().positive().optional(),
});

const dimElementSchema = elementBaseSchema.extend({
  type: z.literal("dim"),
  x1: z.number(), y1: z.number(), x2: z.number(), y2: z.number(),
  label: z.string().max(100),
});

const windowElementSchema = elementBaseSchema.extend({
  type: z.literal("window"),
  x1: z.number(), y1: z.number(), x2: z.number(), y2: z.number(),
});

const doorSymbolElementSchema = elementBaseSchema.extend({
  type: z.literal("door-symbol"),
  x: z.number(), y: z.number(), w: z.number(),
  swing: z.enum(["left", "right"]).optional(),
});

const doorSlideElementSchema = elementBaseSchema.extend({
  type: z.literal("door-slide"),
  x: z.number(), y: z.number(), w: z.number(),
  direction: z.enum(["left", "right"]).optional(),
});

const stairElementSchema = elementBaseSchema.extend({
  type: z.literal("stair"),
  x: z.number(), y: z.number(), w: z.number(), h: z.number(),
  steps: z.number().int().positive().max(50).optional(),
});

const openingElementSchema = elementBaseSchema.extend({
  type: z.literal("opening"),
  x1: z.number(), y1: z.number(), x2: z.number(), y2: z.number(),
});

const columnElementSchema = elementBaseSchema.extend({
  type: z.literal("column"),
  cx: z.number(), cy: z.number(),
  size: z.number().positive().optional(),
});

const sketchElementSchema = z.discriminatedUnion("type", [
  lineElementSchema, rectElementSchema, circleElementSchema,
  arcElementSchema, arrowElementSchema, textElementSchema,
  dashedElementSchema, dimElementSchema, windowElementSchema,
  doorSymbolElementSchema, doorSlideElementSchema, stairElementSchema,
  openingElementSchema, columnElementSchema,
]);

export const sketchDataSchema = z.object({
  paper: z.enum(["cream", "white", "yellow", "blueprint"]),
  tool: z.enum(["pencil", "ballpoint", "ink"]),
  inkColor: z.string().max(20),
  amplitude: z.number().min(0).max(1),
  waves: z.number().min(0).max(1),
  humanness: z.number().min(0).max(1),
  width: z.number().positive().max(5000).optional(),
  height: z.number().positive().max(5000).optional(),
  elements: z.array(sketchElementSchema).max(1000),
});

export const createSketchSchema = z.object({
  title: z.string().max(200).optional(),
  data: sketchDataSchema,
  public: z.boolean().optional(),
});

export const updateSketchSchema = z.object({
  title: z.string().max(200).optional(),
  data: sketchDataSchema.optional(),
  public: z.boolean().optional(),
});

export const shareSketchSchema = z.object({
  email: z.string().email().max(255),
  canEdit: z.boolean().optional(),
});

// Sanitize text content to prevent XSS
export function sanitizeSketchData(data: z.infer<typeof sketchDataSchema>) {
  return {
    ...data,
    elements: data.elements.map((el) => {
      if ("text" in el && typeof el.text === "string") {
        return {
          ...el,
          text: el.text
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#x27;"),
        };
      }
      if ("label" in el && typeof el.label === "string") {
        return {
          ...el,
          label: el.label
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;"),
        };
      }
      return el;
    }),
  };
}
