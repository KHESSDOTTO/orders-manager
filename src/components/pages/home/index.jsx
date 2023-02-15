import { SearchBar } from "../../searchBar";
import { ListOfProducts } from "../../listOfProducts";
import { useState } from "react";
import style from "../home/style.module.css";

export function Home() {
  const [searchText, setSearchText] = useState("");

  function search(text) {
    setSearchText(text);
  }

  return (
    <div className={style.home}>
      <div className={style.searchBar}>
        <SearchBar filterProducts={search} placeHolder="Search Products" />
      </div>
      <ListOfProducts textFilter={searchText} />
    </div>
  );
}
