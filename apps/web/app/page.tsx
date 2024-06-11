// 3rd party
import { JSX } from "react";
// repo
import Link from "@repo/ui/link";
import { URL_WALKTHROUGH_HREF } from "@repo/constants/src/urls";
import ModalSide from "@repo/ui/modal-side";

export default function Page(): JSX.Element {
  const sections = [
    { number: "9.9.9", header: "Egress from Dwelling Units", content: "" },
    { number: "9.9.9.1", header: "Travel Limit to Exits or Egress Doors", content: "Except as provided in Sentences (2) and (3), every dwelling unit containing more than 1 storey shall have exits or egress doors located so that it shall not be necessary to travel up or down more than 1 storey to reach a level served by..." },
    { number: "9.9.9.2", header: "Two Separate Exits", content: "Except as provided in Sentence (2) and Sentence 9.9.7.3(1), where an egress door from a dwelling unit opens onto a public corridor or exterior passageway..." },
    { number: "9.9.9.2", header: "Two Separate Exits", content: "Except as provided in Sentence (2) and Sentence 9.9.7.3(1), where an egress door from a dwelling unit opens onto a public corridor or exterior passageway..." },
    { number: "9.9.9.2", header: "Two Separate Exits", content: "Except as provided in Sentence (2) and Sentence 9.9.7.3(1), where an egress door from a dwelling unit opens onto a public corridor or exterior passageway..." },
    { number: "9.9.9.2", header: "Two Separate Exits", content: "Except as provided in Sentence (2) and Sentence 9.9.7.3(1), where an egress door from a dwelling unit opens onto a public corridor or exterior passageway..." },
    { number: "9.9.9.2", header: "Two Separate Exits", content: "Except as provided in Sentence (2) and Sentence 9.9.7.3(1), where an egress door from a dwelling unit opens onto a public corridor or exterior passageway..." },
    { number: "9.9.9.2", header: "Two Separate Exits", content: "Except as provided in Sentence (2) and Sentence 9.9.7.3(1), where an egress door from a dwelling unit opens onto a public corridor or exterior passageway..." },
    { number: "9.9.9.2", header: "Two Separate Exits", content: "Except as provided in Sentence (2) and Sentence 9.9.7.3(1), where an egress door from a dwelling unit opens onto a public corridor or exterior passageway..." },
    // Add more sections as needed
  ];
  return (
    <div className="u-container">
      <p>
        <Link href={`${URL_WALKTHROUGH_HREF}/9.9.9/`}>Walkthrough 9.9.9</Link>
      </p>
      <div>
      <ModalSide sections={sections}/>
      </div>
    </div>
  );
}
