// repo
import { EnumBuildingTypes } from "@repo/constants/src/constants";
// local
import multiDwelling from "../json/building-types/multi-dwelling/multi-dwelling.json";
import singleDwelling from "../json/building-types/single-dwelling/single-dwelling.json";

interface UseBuildingTypeDataProps {
  /*
   * building type to get
   */
  buildingType: string;
}

export interface BuildingTypeJSONType {
  title: string;
  description: string;
  walkthroughs: string[];
  relatedBuildingTypes: string[];
}

export const BuildingTypeJSONData: Record<
  EnumBuildingTypes,
  BuildingTypeJSONType
> = {
  [EnumBuildingTypes.SINGLE_DWELLING]: singleDwelling,
  [EnumBuildingTypes.MULTI_DWELLING]: multiDwelling,
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
