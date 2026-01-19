import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGenerationByName } from '@/lib/api/generations';
import { GenerationDetail as GenerationDetailComponent } from '@/components/generations/GenerationDetail';
import { BackButton } from '@/components/ui/BackButton';
import { formatGenerationName } from '@/lib/utils/generations';

interface GenerationDetailPageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({
  params,
}: GenerationDetailPageProps): Promise<Metadata> {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const formattedName = formatGenerationName(decodedName);

  return {
    title: `${formattedName} | Pokedex`,
    description: `View details for ${formattedName} including the primary region and all Pokemon in this generation.`,
  };
}

export default async function GenerationDetailPage({
  params,
}: GenerationDetailPageProps) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  let generation;
  try {
    generation = await getGenerationByName(decodedName);
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      notFound();
    }
    throw error;
  }

  return (
    <div>
      <div className="mb-6">
        <BackButton fallbackPath="/generations" />
      </div>
      <GenerationDetailComponent generation={generation} />
    </div>
  );
}
