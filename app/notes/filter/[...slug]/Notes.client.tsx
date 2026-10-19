'use client';
import css from '@/app/notes/filter/[...slug]/NotesPage.module.css';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api';
import Link from 'next/link';

interface NotesProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const notesQuery = useQuery({
    queryKey: ['notes', searchQuery, page, tag],
    queryFn: () => fetchNotes(searchQuery, page, tag),
    placeholderData: keepPreviousData,
  });

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setPage(1);
  }, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSearch} />
        {notesQuery.data && notesQuery.data.totalPages > 1 && (
          <Pagination
            totalPages={notesQuery.data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {notesQuery.data && notesQuery.data.notes.length > 0 && (
        <NoteList notes={notesQuery.data.notes} />
      )}
    </div>
  );
}
