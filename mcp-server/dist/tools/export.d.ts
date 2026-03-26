export type ExportFormat = "json" | "skissify-url";
export interface ExportInput {
    sketchId: string;
    format?: ExportFormat;
}
export interface ExportResult {
    format: ExportFormat;
    data: string;
    mimeType: string;
    instructions: string;
}
export declare function exportSketch(input: ExportInput): ExportResult;
/**
 * List all sketches in the current session.
 */
export declare function listSketches(): Array<{
    id: string;
    name?: string;
    elementCount: number;
    createdAt: string;
    updatedAt: string;
}>;
//# sourceMappingURL=export.d.ts.map