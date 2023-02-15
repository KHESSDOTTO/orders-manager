import { useState } from "react";

export function SearchBar(props) {
  const [searchContent, setSearchContent] = useState("");

  function handleChange(event) {
    setSearchContent(event.target.value);
    props.filterProducts(event.target.value);
  }

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search Product"
            aria-label="Search"
            value={searchContent}
            onChange={handleChange}
          />
        </form>
      </div>
    </nav>
  );
}
