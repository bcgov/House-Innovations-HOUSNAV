type BuildingCodes = "9.9.9";

interface UseBuildingCodeDataProps {
  /*
   * ID of the data to get
   */
  id: BuildingCodes;
}

interface BuildingCodeJSONType {
  title: string;
  content: string;
}

const BuildingCodeJSONData: Record<BuildingCodes, BuildingCodeJSONType> = {
  "9.9.9": {
    title: "9.9.9",
    content:
      "Except as provided in Sentences (2) and (3), every dwelling unit containing more than 1 storey shall have exits or egress doors located so that it shall not be necessary to travel up or down more than 1 storey to reach a level served by",
  },
};

export default function useBuildingCodeData({ id }: UseBuildingCodeDataProps) {
  return BuildingCodeJSONData[id];
}
