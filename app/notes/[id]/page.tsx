import { fetchNoteById } from '@/lib/api';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';

interface NoteDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedND = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedND}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
