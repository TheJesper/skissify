import { z } from "zod";

const elementBaseSchema = z.object({
  color: z.string().max(20).optional(),
  textColor: z.string().max(20).optional(),
  strokeWidth: z.number().positive().max(20).optional(),
  rotation: z.number().optional(),
  locked: z.boolean().optional(),
});

const lineElementSchema = elementBaseSchema.extend({
  type: z.literal("line"),
  x1: z.number(), y1: z.number(), x2: z.number(), y2: z.number(),
});

const rectElementSchema = elementBaseSchema.extend({
  type: z.literal("rect"),
  x: z.number(), y: z.number(), w: z.number(), h: z.number(),
  label: z.string().max(200).optional(),
});

const circleElementSchema = elementBaseSchema.extend({
  type: z.literal("circle"),
  cx: z.number(), cy: z.number(), r: z.number().positive(),
});

const arcElementSchema = elementBaseSchema.extend({
  type: z.literal("arc"),
  // Support both cx/cy (production) and x/y (POC) center aliases
  cx: z.number().optional(), cy: z.number().optional(),
  x: z.number().optional(), y: z.number().optional(),
  r: z.number().positive(),
  startAngle: z.number().optional(),
  // endAngle (production) or sweep (POC relative angle)
  endAngle: z.number().optional(),
  sweep: z.number().optional(),
});

const arrowElementSchema = elementBaseSchema.extend({
  type: z.literal("arrow"),
  x1: z.number(), y1: z.number(), x2: z.number(), y2: z.number(),
});

const textElementSchema = elementBaseSchema.extend({
  type: z.literal("text"),
  x: z.number(), y: z.number(),
  // Production uses 'text', POC uses 'content'
  text: z.string().max(500).optional(),
  content: z.string().max(500).optional(),
  // Production uses 'fontSize', POC uses 'size'
  fontSize: z.number().positive().max(200).optional(),
  size: z.number().positive().max(200).optional(),
  fontFamily: z.string().max(50).optional(),
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
  offset: z.number().optional(),
  fontFamily: z.string().max(50).optional(),
});

const windowElementSchema = elementBaseSchema.extend({
  type: z.literal("window"),
  // Legacy format: x1/y1/x2/y2
  x1: z.number().optional(), y1: z.number().optional(),
  x2: z.number().optional(), y2: z.number().optional(),
  // POC format: x/y/w/d/wall
  x: z.number().optional(), y: z.number().optional(),
  w: z.number().optional(),
  d: z.number().optional(),
  wall: z.enum(["h", "v"]).optional(),
});

const doorSymbolElementSchema = elementBaseSchema.extend({
  type: z.literal("door-symbol"),
  x: z.number(), y: z.number(),
  w: z.number().optional(),
  swing: z.enum(["left", "right"]).optional(),
  wall: z.enum(["h", "v"]).optional(),
});

const doorSlideElementSchema = elementBaseSchema.extend({
  type: z.literal("door-slide"),
  x: z.number(), y: z.number(),
  w: z.number().optional(),
  d: z.number().optional(),
  direction: z.enum(["left", "right"]).optional(),
  wall: z.enum(["h", "v"]).optional(),
});

const stairElementSchema = elementBaseSchema.extend({
  type: z.literal("stair"),
  x: z.number(), y: z.number(), w: z.number(), h: z.number(),
  steps: z.number().int().positive().max(50).optional(),
  dir: z.enum(["up", "down"]).optional(),
});

const openingElementSchema = elementBaseSchema.extend({
  type: z.literal("opening"),
  // Legacy format: x1/y1/x2/y2
  x1: z.number().optional(), y1: z.number().optional(),
  x2: z.number().optional(), y2: z.number().optional(),
  // POC format: x/y/w/wall
  x: z.number().optional(), y: z.number().optional(),
  w: z.number().optional(),
  wall: z.enum(["h", "v"]).optional(),
});

const columnElementSchema = elementBaseSchema.extend({
  type: z.literal("column"),
  // Support both cx/cy (legacy) and x/y (POC) center aliases
  cx: z.number().optional(), cy: z.number().optional(),
  x: z.number().optional(), y: z.number().optional(),
  // Support both size (legacy) and s (POC shorthand)
  size: z.number().positive().optional(),
  s: z.number().positive().optional(),
});

const sketchElementSchema = z.discriminatedUnion("type", [
  lineElementSchema, rectElementSchema, circleElementSchema,
  arcElementSchema, arrowElementSchema, textElementSchema,
  dashedElementSchema, dimElementSchema, windowElementSchema,
  doorSymbolElementSchema, doorSlideElementSchema, stairElementSchema,
  openingElementSchema, columnElementSchema,
]);

const blueprintMetadataSchema = z.object({
  title: z.string().max(200).optional(),
  owner: z.string().max(200).optional(),
  date: z.string().max(50).optional(),
  scale: z.string().max(50).optional(),
  sheetNumber: z.string().max(50).optional(),
  drawnBy: z.string().max(100).optional(),
}).optional();

export const sketchDataSchema = z.object({
  paper: z.enum(["cream", "white", "yellow", "blueprint"]),
  tool: z.enum(["pencil", "ballpoint", "ink"]),
  inkColor: z.string().max(20),
  amplitude: z.number().min(0).max(3),
  waves: z.number().min(0).max(3),
  humanness: z.number().min(0).max(1),
  width: z.number().positive().max(5000).optional(),
  height: z.number().positive().max(5000).optional(),
  sessionSeed: z.number().optional(),
  textFont: z.enum(["courier", "georgia", "arial", "handwritten", "kalam", "jetbrains"]).optional(),
  dimFont: z.enum(["courier", "georgia", "arial", "handwritten", "kalam", "jetbrains"]).optional(),
  renderStyle: z.enum(["sketch", "technical", "blueprint"]).optional(),
  metadata: blueprintMetadataSchema,
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
