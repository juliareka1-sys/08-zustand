import { fetchNoteById } from '@/lib/api';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NotePreviewClient from './NotePreview.client';

interface NotePreviewProps {
  params: Promise<{
    id: string;
  }>;
}

const NotePreview = async ({ params }: NotePreviewProps) => {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedND = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedND}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
};

export default NotePreview;
