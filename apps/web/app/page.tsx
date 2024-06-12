// 3rd party
import { JSX } from "react";
// repo
import Link from "@repo/ui/link";
import { URL_WALKTHROUGH_HREF } from "@repo/constants/src/urls";
import ModalSide from "@repo/ui/modal-side";

export default function Page(): JSX.Element {
  return (
    <div className="u-container">
      <p>
        <Link href={`${URL_WALKTHROUGH_HREF}/9.9.9/`}>Walkthrough 9.9.9</Link>
      </p>
    </div>
  );
}
