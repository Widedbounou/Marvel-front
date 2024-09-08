import Card from "./Card";
import ComicCard from "./ComicsCard";

const SearchResultsCard = ({ data, category }) => {
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {data.results.map((item, index) => {
        return category === "characters" ? (
          <Card key={index} data={item} />
        ) : (
          <ComicCard key={index} data={item} />
        );
      })}
    </div>
  );
};

export default SearchResultsCard;
