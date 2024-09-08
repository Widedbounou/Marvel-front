import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ComicCard from "../Components/ComicsCard";

const ComicsPerCharacter = () => {
  const [data, setData] = useState([]);
  const params = useParams();
  const id = params.characterId;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-marvel.herokuapp.com/comics/${id}`
      );
      setData(response.data.comics);
      console.log(response.data);
    };
    fetchData();
  }, [id]);

  return (
    <div className="container">
      <div className="wrapMyCollection">
        {data &&
          data.map((elem, index) => {
            return <ComicCard key={index} index={index} data={elem} heart />;
          })}
      </div>
    </div>
  );
};

export default ComicsPerCharacter;
