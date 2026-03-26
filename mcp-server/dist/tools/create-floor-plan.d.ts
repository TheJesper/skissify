import { FloorPlanRoom, FloorPlanStyle, StoredSketch } from "../types.js";
export interface CreateFloorPlanInput {
    rooms: FloorPlanRoom[];
    style?: FloorPlanStyle;
    scale?: string;
    title?: string;
}
export declare function createFloorPlan(input: CreateFloorPlanInput): StoredSketch;
//# sourceMappingURL=create-floor-plan.d.ts.map