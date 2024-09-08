import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = ({ data, handleAddFav, heart, cross, handleRemoveFav }) => {
  const url =
    data.thumbnail.path + "/portrait_uncanny." + data.thumbnail.extension;
  // console.log(url);

  return (
    <div style={{ position: "relative" }}>
      {heart ? (
        <div
          onClick={() => handleAddFav(data._id, "char")}
          className="heart-icon"
        >
          <FontAwesomeIcon icon="heart" />
        </div>
      ) : cross ? (
        <div onClick={() => handleRemoveFav(data._id)} className="heart-icon">
          <FontAwesomeIcon icon="times" />
        </div>
      ) : null}
      <Link to={`/comics/${data._id}`} className="cardsChar">
        <img alt="character" src={url} />
        <span>{data.name}</span>
        {/* <p><data.descripti></data.descripti></p> */}
      </Link>
    </div>
  );
};

export default Card;
