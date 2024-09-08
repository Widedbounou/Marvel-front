import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

// IMPORTS
import Header from "./Components/Header";
import Home from "./Pages/Home";
import ComicsPerCharacter from "./Pages/ComicsPerCharacters";
import Comics from "./Pages/Comics";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import MyCollection from "./Pages/MyCollection";

// FONT_AWESOME
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faTimes } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart, faTimes);

function App() {
  const [searchChar, setSearchChar] = useState("");
  const [skipChar, setSkipChar] = useState(0);
  const [data, setData] = useState([]);
  // const [searchCom, setSearchCom] = useState("");
  // const [skipCom, setSkipCom] = useState(0);
  const [token, setToken] = useState(Cookies.get("token") || null);
  let cookie = Cookies.get("fav");
  const [fav, setFav] = useState((cookie && JSON.parse(cookie)) || [[], []]);

  // LogIn and SignUp
  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token);
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  // Search Characters/ Comics
  const handleSearchChar = async (event, skip) => {
    event.preventDefault();
    const response = await axios.get(
      `https://lereacteur-marvel.herokuapp.com/search-characters?name=${searchChar}&skip=${skip}`
    );
    setData(response.data);
  };

  // FAVORIS
  const handleAddFav = (id, from) => {
    let favCopy = [...fav];
    if (from === "char") {
      if (favCopy[0].indexOf(id) === -1) {
        favCopy[0].push(id);
        alert("Favoris ajouté !");
      } else {
        alert("Déjà en favoris !");
      }
    } else if (favCopy[1].indexOf(id) === -1) {
      favCopy[1].push(id);
      alert("Favoris ajouté !");
    } else {
      alert("Déjà en favoris !");
    }

    setFav(favCopy);
    Cookies.set("fav", JSON.stringify(favCopy));
  };

  const handleRemoveFav = (id) => {
    const fav = Cookies.get("fav");
    const tabFav = fav && JSON.parse(fav);

    let newFav = [[], []];
    for (let i = 0; i < tabFav.length; i++) {
      for (let j = 0; j < tabFav[i].length; j++) {
        if (i === 0) {
          if (tabFav[i][j] !== id) {
            newFav[0].push(tabFav[i][j]);
          }
        } else {
          if (tabFav[i][j] !== id) {
            newFav[1].push(tabFav[i][j]);
          }
        }
      }
    }
    setFav(newFav);
    Cookies.set("fav", JSON.stringify(newFav));
  };

  return (
    <Router>
      <Header
        setData={setData}
        setToken={setToken}
        token={token}
        search={searchChar}
        setSearch={setSearchChar}
        handleSearchChar={handleSearchChar}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              searchData={data}
              searchChar={searchChar}
              setSearchChar={setSearchChar}
              handleAddFav={handleAddFav}
              skipChar={skipChar}
              setSkipChar={setSkipChar}
            />
          }
        />

        <Route
          path="/comics/:characterId"
          element={
            <ComicsPerCharacter
              handleAddFav={handleAddFav}
              searchData={data}
              setSkipChar={setSkipChar}
              skipChar={skipChar}
            />
          }
        />
        <Route path="/comics" element={Comics} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
        <Route
          path="/myCollection"
          element={<MyCollection handleRemoveFav={handleRemoveFav} fav={fav} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
