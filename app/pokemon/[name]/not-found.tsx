import Link from 'next/link';

export default function PokemonNotFound() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700 text-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Pokemon Not Found
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        The Pokemon you&apos;re looking for doesn&apos;t exist. Check the spelling or try searching for a different Pokemon.
      </p>
      <Link
        href="/pokemon"
        className="inline-block px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md font-semibold"
      >
        Back to Pokemon List
      </Link>
    </div>
  );
}
