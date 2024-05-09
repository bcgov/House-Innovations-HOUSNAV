import { IconProps } from "../Icon";

export default function OpenInNew({ title, id, ...props }: IconProps) {
  return (
    <svg
      width="12"
      height="13"
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={id ? id : undefined}
      {...props}
    >
      {id === undefined || title === undefined ? null : (
        <title id={id}>{title}</title>
      )}
      <path
        d="M9.5 10H2.5V3H6V2H2.5C1.945 2 1.5 2.45 1.5 3V10C1.5 10.55 1.945 11 2.5 11H9.5C10.05 11 10.5 10.55 10.5 10V6.5H9.5V10ZM7 2V3H8.795L3.88 7.915L4.585 8.62L9.5 3.705V5.5H10.5V2H7Z"
        fill="currentColor"
      />
    </svg>
  );
}
