import { useState } from "react";
import { SearchBar } from "../../searchBar";
import { ListOfOrders } from "../../listOfOrders";

export function Orders() {
  const [searchText, setSearchText] = useState("");

  function search(text) {
    setSearchText(text);
  }

  return (
    <div>
      <SearchBar filterProducts={search} placeHolder={"Search Orders"} />
      <ListOfOrders textFilter={searchText} />
    </div>
  );
}
