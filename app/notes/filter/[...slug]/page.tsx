import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from '@/app/notes/filter/[...slug]/Notes.client';

interface SlugBox {
  slug: string[];
}

interface PropsFromNext {
  params: Promise<SlugBox>;
}

const Notes = async ({ params }: PropsFromNext) => {
  const slugBox = await params;
  const slugUnpack = slugBox.slug;
  const tagName = slugUnpack[0];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, tagName],
    queryFn: () => fetchNotes('', 1, tagName),
  });

  const dehydrated = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrated}>
      <NotesClient tag={tagName} />
    </HydrationBoundary>
  );
};

export default Notes;
