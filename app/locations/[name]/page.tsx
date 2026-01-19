import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocationByName, getLocationAreaByUrl } from '@/lib/api/locations';
import { LocationDetail as LocationDetailComponent } from '@/components/locations/LocationDetail';
import { BackButton } from '@/components/ui/BackButton';
import { LocationArea } from '@/lib/types/locations';

interface LocationDetailPageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({
  params,
}: LocationDetailPageProps): Promise<Metadata> {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const formattedName = decodedName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${formattedName} | Pokedex`,
    description: `View details for ${formattedName} including sub-areas and Pokemon encounters.`,
  };
}

export default async function LocationDetailPage({
  params,
}: LocationDetailPageProps) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  let location;
  try {
    location = await getLocationByName(decodedName);
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      notFound();
    }
    throw error;
  }

  // Fetch location areas for all sub-areas in parallel
  const locationAreaPromises = location.areas.map((area) =>
    getLocationAreaByUrl(area.url).catch(() => null)
  );
  const locationAreasResults = await Promise.all(locationAreaPromises);
  const locationAreas: LocationArea[] = locationAreasResults.filter(
    (area): area is LocationArea => area !== null
  );

  return (
    <div>
      <div className="mb-6">
        <BackButton fallbackPath="/locations" />
      </div>
      <LocationDetailComponent location={location} locationAreas={locationAreas} />
    </div>
  );
}
