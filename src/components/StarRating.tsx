import { Star } from "lucide-react";
import { useState } from "react";

export function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const [hover, setHover] = useState(0);
  const active = hover || value;

  return (
    <div className="flex items-center gap-2" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          onMouseEnter={() => setHover(n)}
          onClick={() => onChange(n)}
          className="transition-transform duration-150 hover:scale-115 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded"
        >
          <Star
            className={
              n <= active
                ? "size-8 fill-primary text-primary drop-shadow-sm transition-colors"
                : "size-8 text-muted-foreground/40 transition-colors"
            }
          />
        </button>
      ))}
      <span className="ml-2 text-sm font-semibold text-muted-foreground">
        {value ? `${value}/5` : ""}
      </span>
    </div>
  );
}
