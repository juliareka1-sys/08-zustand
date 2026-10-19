import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CreateNotePayload } from '@/types/note';

const initialDraft: CreateNotePayload = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteStore {
  draft: CreateNotePayload;
  setDraft: (note: CreateNotePayload) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: note => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
      partialize: state => ({ draft: state.draft }),
    }
  )
);
