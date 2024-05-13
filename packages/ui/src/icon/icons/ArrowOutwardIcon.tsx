import { IconProps } from "../Icon";

export default function ArrowOutwardIcon({ title, id, ...props }: IconProps) {
  return (
    <svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={id ? id : undefined}
      aria-hidden="true"
      {...props}
    >
      {id === undefined || title === undefined ? null : (
        <title id={id}>{title}</title>
      )}
      <path
        d="M3.79183 3.70833V4.87499H8.80266L3.2085 10.4692L4.031 11.2917L9.62516 5.69749V10.7083H10.7918V3.70833H3.79183Z"
        fill="currentColor"
      />
    </svg>
  );
}
