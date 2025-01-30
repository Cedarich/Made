

export function FeaturedAds() {
  return (
    <div className="bg-gray-800/40 backdrop-blur-md rounded-xl border border-gray-700/50 p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        Sponsored Content
      </h2>
      <div className="w-full h-48 bg-gray-900/20 rounded-lg flex items-center justify-center">
        <svg 
          className="w-full h-full"
          viewBox="0 0 300 150" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="300" height="150" rx="8" fill="#1F2937"/>
          <text x="20" y="50" font-family="Arial" font-size="20" fill="#6EE7B7">
            Ad Space Available
          </text>
          <text x="20" y="80" font-family="Arial" font-size="14" fill="#9CA3AF">
            Your ad could be here
          </text>
          <rect x="20" y="100" width="260" height="30" rx="4" fill="#374151"/>
          <text x="30" y="122" font-family="Arial" font-size="14" fill="#F3F4F6">
            Contact us to advertise
          </text>
        </svg>
      </div>
    </div>
  );
} 