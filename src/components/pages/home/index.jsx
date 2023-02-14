import { SearchBar } from "../../searchBar";
import { ListOfProducts } from "../../listOfProducts";
import { useState } from "react";

export function Home() {
  const [searchText, setSearchText] = useState("");

  function search(text) {
    setSearchText(text);
  }

  return (
    <div>
      <SearchBar filterProducts={search} />
      <ListOfProducts textFilter={searchText} />
    </div>
  );
}
