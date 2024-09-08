import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SearchComics from "./SearchComics";
import logo from "../assets/logo.png";

const Header = ({
  setData,
  setToken,
  token,
  search,
  setSearch,
  handleSearchChar,
}) => {
  const navigate = useNavigate();

  return (
    <header className="container">
      <div className="diplayheader">
        <div className="logo">
          <Link to="/" className="logoLink">
            <img src={logo} alt="logo marvel" />
          </Link>
        </div>
        <SearchComics
          search={search}
          setSearch={setSearch}
          handleSearchChar={handleSearchChar}
          setData={setData}
        />
        <div className="diplayLeftButton">
          <Link to="/myCollection" className="linkto">
            My Collection
          </Link>

          {token ? (
            <span
              onClick={() => {
                setToken(null);
                Cookies.remove("token");
                navigate("/");
              }}
              className="buttonLogout"
            >
              Logout
            </span>
          ) : (
            <div className="displayButton">
              <div>
                <Link to="/login" className="linkto">
                  Login
                </Link>
              </div>
              <div>
                <Link to="/signup" className="linkto">
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
