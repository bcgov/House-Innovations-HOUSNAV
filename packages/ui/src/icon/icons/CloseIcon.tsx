import { IconProps } from "../Icon";

export default function CloseIcon({ title, id, ...props }: IconProps) {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
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
        d="M15.8332 5.84169L14.6582 4.66669L9.99984 9.32502L5.3415 4.66669L4.1665 5.84169L8.82484 10.5L4.1665 15.1584L5.3415 16.3334L9.99984 11.675L14.6582 16.3334L15.8332 15.1584L11.1748 10.5L15.8332 5.84169Z"
        fill="currentColor"
      />
    </svg>
  );
}
