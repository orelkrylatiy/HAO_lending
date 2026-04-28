const ArrowLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M4.748 11.416C4.417 11.738 4.417 12.262 4.748 12.584L9.554 17.258C9.886 17.581 10.424 17.581 10.756 17.258C11.088 16.935 11.088 16.412 10.756 16.09L7.4 12.826H18.65C19.12 12.826 19.5 12.456 19.5 12C19.5 11.544 19.12 11.174 18.65 11.174H7.4L10.756 7.91C11.088 7.588 11.088 7.065 10.756 6.742C10.424 6.419 9.886 6.419 9.554 6.742L4.748 11.416Z" fill="white"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M14.445 6.742L19.251 11.416C19.583 11.738 19.583 12.262 19.251 12.584L14.445 17.258C14.114 17.581 13.576 17.581 13.244 17.258C12.912 16.935 12.912 16.412 13.244 16.09L16.6 12.826H5.35C4.88 12.826 4.5 12.456 4.5 12C4.5 11.544 4.88 11.174 5.35 11.174H16.6L13.244 7.91C12.912 7.588 12.912 7.065 13.244 6.742C13.576 6.419 14.114 6.419 14.445 6.742Z" fill="white"/>
  </svg>
);

interface CarouselDotsProps {
  total: number;
  current: number;
  onSelect: (i: number) => void;
  label?: string;
}

export function CarouselDots({ total, current, onSelect, label = "Слайд" }: CarouselDotsProps) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`${label} ${i + 1}`}
          className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-[#F86704]" : "bg-[#e8ddd5]"}`}
        />
      ))}
    </div>
  );
}

interface CarouselNavProps {
  onPrev: () => void;
  onNext: () => void;
  total: number;
  current: number;
  onSelect: (i: number) => void;
  dotLabel?: string;
}

export function CarouselNav({ onPrev, onNext, total, current, onSelect, dotLabel }: CarouselNavProps) {
  return (
    <div className="flex items-center gap-3">
      <CarouselDots total={total} current={current} onSelect={onSelect} label={dotLabel} />
      <button onClick={onPrev} aria-label="Назад" className="carousel-btn">
        <ArrowLeft />
      </button>
      <button onClick={onNext} aria-label="Вперёд" className="carousel-btn">
        <ArrowRight />
      </button>
    </div>
  );
}
