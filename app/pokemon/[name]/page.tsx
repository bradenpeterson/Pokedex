import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPokemonByName } from '@/lib/api/pokemon';
import { PokemonDetail as PokemonDetailComponent } from '@/components/pokemon/PokemonDetail';
import { BackButton } from '@/components/ui/BackButton';

interface PokemonDetailPageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({
  params,
}: PokemonDetailPageProps): Promise<Metadata> {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const formattedName = decodedName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${formattedName} | Pokedex`,
    description: `View details for ${formattedName} including stats, moves, and locations.`,
  };
}

export default async function PokemonDetailPage({
  params,
}: PokemonDetailPageProps) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  let pokemon;
  try {
    pokemon = await getPokemonByName(decodedName);
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      notFound();
    }
    throw error;
  }

  return (
    <div>
      <div className="mb-6">
        <BackButton fallbackPath="/pokemon" />
      </div>
      <PokemonDetailComponent pokemon={pokemon} />
    </div>
  );
}
