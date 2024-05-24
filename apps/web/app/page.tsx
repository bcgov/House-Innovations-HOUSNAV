"use client";
// 3rd party
import { JSX, useState } from "react";
import { Form } from "react-aria-components";
// repo
import Link from "@repo/ui/link";
import { URL_WALKTHROUGH_HREF } from "@repo/constants/src/urls";
import CheckboxGroup from "@repo/ui/checkbox-group";
import Button from "@repo/ui/button";

export default function Page(): JSX.Element {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selectedItems);
  };

  return (
    <div className="u-container">
      <p>
        <Link href={`${URL_WALKTHROUGH_HREF}/9.9.9/`}>Walkthrough 9.9.9</Link>
      </p>
      <Form onSubmit={handleSubmit}>
        <CheckboxGroup
          name="test"
          value={selectedItems}
          onChange={(value) => setSelectedItems(value)}
          label={"Checkbox Group Label"}
          isRequired
          options={[
            { value: "1", label: "Option 1" },
            { value: "2", label: "Option 2" },
          ]}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
