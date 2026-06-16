"use client";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function OpenSignupButton({ children, className }: Props) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        window.dispatchEvent(new CustomEvent("hao:open-signup"));
      }}
    >
      {children}
    </button>
  );
}
