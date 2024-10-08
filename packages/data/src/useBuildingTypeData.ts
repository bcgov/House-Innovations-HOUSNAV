import {
  BUILDING_TYPE_SINGLE_DWELLING,
  BUILDING_TYPE_MULTI_DWELLING,
} from "@repo/constants/src/constants";

type BuildingTypes =
  | typeof BUILDING_TYPE_SINGLE_DWELLING
  | typeof BUILDING_TYPE_MULTI_DWELLING;

interface UseBuildingTypeDataProps {
  /*
   * building type to get
   */
  buildingType: string;
}

export interface BuildingTypeJSONType {
  name: string;
}

export const BuildingTypeJSONData: Record<BuildingTypes, BuildingTypeJSONType> =
  {
    [BUILDING_TYPE_SINGLE_DWELLING]: {
      name: "Single Dwelling Unit",
    },
    [BUILDING_TYPE_MULTI_DWELLING]: {
      name: "Multi-Unit Dwelling",
    },
  };

export default function useBuildingTypeData({
  buildingType,
}: UseBuildingTypeDataProps): BuildingTypeJSONType {
  const data = BuildingTypeJSONData[buildingType as BuildingTypes];
  if (!data) {
    throw new Error(`No data found for building type ${buildingType}`);
  }

  return data;
}
