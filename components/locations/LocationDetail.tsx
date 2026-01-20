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
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-900 shadow-lg">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
          {formattedName}
        </h1>
        {regionName && (
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Region: <span className="text-blue-600 dark:text-blue-400">{regionName}</span></p>
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
