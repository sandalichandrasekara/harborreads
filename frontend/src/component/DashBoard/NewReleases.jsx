import SearchHistory from '../search/SearchHistory';

const PreviousRecommendations = () => {
  return (
    <section className="previous-recommendations bg-gray-300 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 mt-2">Previous Recommendations</h2>
      <SearchHistory/>
      {/* Add your book cards here */}
    </section>
  );
};

export default PreviousRecommendations;
