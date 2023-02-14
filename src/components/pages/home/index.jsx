import { SearchBar } from "../../searchBar";
import { ListOfProducts } from "../../listOfProducts";

export function Home() {
  return (
    <div className={style.home}>
      <SearchBar />
      <ListOfProducts />
    </div>
  );
}
