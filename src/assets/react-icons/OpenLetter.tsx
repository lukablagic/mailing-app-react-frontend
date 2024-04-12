const OpenLetter = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      strokeWidth={1}
      d="M.5 15.5h15v-10l-7-5h-1l-7 5v10z"
    />
    <path
      strokeWidth={1}
      d="m15.5 5.5-7 6h-1l-7-6"
    />
    <path
      strokeWidth={1}
      d="M15.5 15.5H.5l7-6h1l7 6z"
    />
  </svg>
);
export default OpenLetter;
