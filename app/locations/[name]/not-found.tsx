import Link from 'next/link';

export default function LocationNotFound() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700 text-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Location Not Found
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        The location you're looking for doesn't exist. Check the spelling or try searching for a different location.
      </p>
      <Link
        href="/locations"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Back to Locations List
      </Link>
    </div>
  );
}
