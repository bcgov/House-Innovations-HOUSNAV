// repo
import Icon from "@repo/ui/icon";
// local
import "./ResultBanner.css";

const ResultBanner = ({ text, ...props }: { text: string }) => (
  <p className="web-ResultBanner h4" {...props}>
    <Icon type={"checkCircle"} />
    {text}
  </p>
);

export default ResultBanner;
