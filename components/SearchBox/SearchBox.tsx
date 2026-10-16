import css from '@/components/SearchBox/SearchBox.module.css';

interface SearchBoxProps {
  onSearch: (value: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        onSearch(event.target.value)
      }
      placeholder="Search notes"
    />
  );
}
