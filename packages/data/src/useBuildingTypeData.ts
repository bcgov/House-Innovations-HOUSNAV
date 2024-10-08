import { EnumBuildingTypes } from "@repo/constants/src/constants";

interface UseBuildingTypeDataProps {
  /*
   * building type to get
   */
  buildingType: string;
}

export interface BuildingTypeJSONType {
  title: string;
}

export const BuildingTypeJSONData: Record<
  EnumBuildingTypes,
  BuildingTypeJSONType
> = {
  [EnumBuildingTypes.SINGLE_DWELLING]: {
    title: "Single Dwelling Unit",
  },
  [EnumBuildingTypes.MULTI_DWELLING]: {
    title: "Multi-Unit Dwelling",
  },
};

export default function useBuildingTypeData({
  buildingType,
}: UseBuildingTypeDataProps): BuildingTypeJSONType {
  const data = BuildingTypeJSONData[buildingType as EnumBuildingTypes];
  if (!data) {
    throw new Error(`No data found for building type ${buildingType}`);
  }

  return data;
}
