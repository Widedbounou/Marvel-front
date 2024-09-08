import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import Card from "../Components/Card";
import SearchResults from "../Components/SearchResults";

import hero from "../assets/hero.jpg";

const Home = ({
  searchData,
  searchChar,
  handleAddFav,
  skipChar,
  setSkipChar,
  handleSearchChar,
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    try {
      const fetchData = async () => {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:3000/characters?limit=100&skip=${offset}`
        );
        setData(response.data);
        console.log(response.data);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [offset]);

  return isLoading ? (
    <p>En cours de chargement</p>
  ) : (
    <div>
      <div className="homeContainer">
        <div className="heroContainer">
          <img src={hero} alt="hero background" />
        </div>
        {searchData.results && searchData.results.length > 0 ? (
          <SearchResults data={searchData} />
        ) : (
          data.results.map((elem, index) => {
            return (
              <Card
                handleAddFav={handleAddFav}
                key={index}
                index={index}
                data={elem}
                heart
              />
            );
          })
        )}
      </div>
      {searchData.length === 0 && (
        <div className="buttonDipslay">
          {offset !== 0 && (
            <button
              onClick={(e) => {
                if (searchChar.length > 0) {
                  let newSkip = skipChar - 100;
                  setSkipChar(newSkip);
                  handleSearchChar(e, newSkip);
                } else {
                  setOffset(offset - 100);
                }
              }}
              className="buttonOffset"
            >
              Page précédente
            </button>
          )}
          {offset + 100 < data.count && (
            <button
              onClick={(e) => {
                if (searchChar.length > 0) {
                  let newSkip = skipChar + 100;
                  setSkipChar(newSkip);
                  handleSearchChar(e, newSkip);
                } else {
                  setOffset(offset + 100);
                }
              }}
              className="buttonOffset"
            >
              Page suivante
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
