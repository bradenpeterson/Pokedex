import { LocationDetail as LocationDetailType, LocationArea } from '@/lib/types/locations';
import { SubAreaList } from './SubAreaList';

interface LocationDetailProps {
  location: LocationDetailType;
  locationAreas: LocationArea[];
}

function formatLocationName(name: string): string {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatRegionName(name: string): string {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function LocationDetail({ location, locationAreas }: LocationDetailProps) {
  const formattedName = formatLocationName(location.name);
  const regionName = location.region ? formatRegionName(location.region.name) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          {formattedName}
        </h1>
        {regionName && (
          <p className="text-lg text-gray-600 dark:text-gray-400">Region: {regionName}</p>
        )}
      </div>

      {/* Sub-areas */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Sub-areas
        </h2>
        <SubAreaList locationAreas={locationAreas} />
      </div>
    </div>
  );
}
