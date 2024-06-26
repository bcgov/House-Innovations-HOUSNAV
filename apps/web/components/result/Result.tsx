"use client";
// repo
import { TESTID_RESULT } from "@repo/constants/src/testids";
// local
import "./Result.css";

export default function Result({ displayMessage }: { displayMessage: string }) {
  return (
    <div data-testid={TESTID_RESULT} className="web-Result">
      <div className="u-container-walkthrough">
        <p>{displayMessage}</p>
      </div>
    </div>
  );
}
