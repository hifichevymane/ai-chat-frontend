import React from "react";

interface Props {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function Avatar({ onClick }: Props) {
  return (
    <div className="bg-primary-400 rounded-full p-3 w-fit" onClick={onClick} style={{ cursor: onClick ? 'pointer' : undefined }}>
      <svg className="text-primary-000" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <circle cx="12" cy="8" r="5" />
          <path d="M20 21a8 8 0 1 0-16 0m16 0a8 8 0 1 0-16 0" />
        </g>
      </svg>
    </div>
  );
}
