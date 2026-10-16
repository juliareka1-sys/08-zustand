import axios from 'axios';
import type { Note, CreateNotePayload } from '@/types/note';

const accessKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const notehubApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${accessKey}`,
  },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  searchQuery: string,
  page: number,
  tag?: string
): Promise<FetchNotesResponse> => {
  const response = await notehubApi.get<FetchNotesResponse>('/notes', {
    params: {
      search: searchQuery,
      page,
      tag: tag === 'all' ? undefined : tag,
      perPage: 12,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const responseById = await notehubApi.get<Note>(`/notes/${id}`);
  return responseById.data;
};

export const createNote = async (
  noteData: CreateNotePayload
): Promise<Note> => {
  const res = await notehubApi.post<Note>('/notes', noteData);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await notehubApi.delete<Note>(`/notes/${id}`);
  return response.data;
};
