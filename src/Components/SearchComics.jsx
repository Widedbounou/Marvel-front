const SearchComics = ({ searchChar, setSearchChar, handleSearchChar }) => {
  return (
    <div className="searchContainer">
      <form onSubmit={handleSearchChar}>
        <input
          type="search"
          placeholder="Search your comics"
          className="searchInput"
          value={searchChar}
          onChange={(event) => {
            setSearchChar(event.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default SearchComics;
