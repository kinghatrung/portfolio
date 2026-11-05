import { parseRichText } from "../../utils/richText";

const RichText = ({ text }) =>
  parseRichText(text).map((part, i) =>
    part.tone ? (
      <span key={i} className={`text-gradient-${part.tone}`}>
        {part.text}
      </span>
    ) : (
      part.text
    ),
  );

export default RichText;
