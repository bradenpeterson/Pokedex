import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMoveByName } from '@/lib/api/moves';
import { MoveDetail as MoveDetailComponent } from '@/components/moves/MoveDetail';
import { BackButton } from '@/components/ui/BackButton';

interface MoveDetailPageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({
  params,
}: MoveDetailPageProps): Promise<Metadata> {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const formattedName = decodedName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${formattedName} | Pokedex`,
    description: `View details for ${formattedName} move including power, accuracy, PP, and Pokemon that can learn it.`,
  };
}

export default async function MoveDetailPage({
  params,
}: MoveDetailPageProps) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  let move;
  try {
    move = await getMoveByName(decodedName);
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      notFound();
    }
    throw error;
  }

  return (
    <div>
      <div className="mb-6">
        <BackButton fallbackPath="/moves" />
      </div>
      <MoveDetailComponent move={move} />
    </div>
  );
}
