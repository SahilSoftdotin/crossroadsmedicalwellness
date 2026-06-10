import type { ChatChip } from "@/lib/chatbot/types";

export function ChatChips({
  chips,
  onSelect,
  disabled,
}: {
  chips: ChatChip[];
  onSelect: (value: string) => void;
  disabled?: boolean;
}) {
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-start gap-2 pl-0.5">
      {chips.map((chip) => (
        <button
          key={chip.label}
          type="button"
          onClick={() => onSelect(chip.value)}
          disabled={disabled}
          className="rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-3.5 py-1.5 text-xs font-medium text-[var(--forest-800)] shadow-[var(--shadow-xs)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--forest-100)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}
