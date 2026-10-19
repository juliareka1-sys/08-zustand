import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from '@/app/notes/filter/[...slug]/Notes.client';
import { Metadata } from 'next';

interface SlugBox {
  slug: string[];
}

interface PropsFromNext {
  params: Promise<SlugBox>;
}

export async function generateMetadata({
  params,
}: PropsFromNext): Promise<Metadata> {
  const { slug } = await params;
  const tagName = slug[0];

  return {
    title: `Notes: ${tagName}`,
    description: `Notes filtered by tag: ${tagName}`,
    openGraph: {
      title: `Notes: ${tagName}`,
      description: `Notes filtered by tag: ${tagName}`,
      url: `https://notehub.com/notes/filter/${tagName}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub - Notes filtered by tag',
        },
      ],
    },
  };
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
