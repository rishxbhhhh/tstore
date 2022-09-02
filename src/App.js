import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Card from "./components/Card/Card";

function App() {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);
  const [search, setsearch] = useState("");
  const [searchResult, setsearchResult] = useState(null);
  const [filtervalue, setfiltervalue] = useState(null);
  const [filterData, setfilterData] = useState(null);

  // problem: filter is being added and removed but data is not being re-filtered when filter is removed.

  // // to check if filtervalue is being updated and also to re render the filtered data
  useEffect(() => {
    if (filtervalue) {
      const filterArray = filtervalue.split(" ");
      filterArray.forEach((filter) => {
        let filteredData = data.filter((obj) => {
          if (
            obj["color"]?.toLowerCase() === filter ||
            obj["gender"]?.toLowerCase() === filter ||
            obj["type"]?.toLowerCase() === filter
          ) {
            return true;
          } else return false;
        });
        let updatedFilterData = Array.from(new Set(filterData?.concat(filteredData)||filteredData));
        setfilterData(updatedFilterData);
        console.log(updatedFilterData.length);
      });
    }
  }, [filtervalue, data]);

  const handleFilter = (event) => {
    let filterVal = event.target.value.toLowerCase().trim();
    let ifFilterApplied = event.target.checked;
    let joinedFilter = filtervalue;
    if (ifFilterApplied) {
      if (filtervalue) {
        joinedFilter = filtervalue.concat(" ", filterVal);
        setfiltervalue(joinedFilter);
        // console.log("Added Filter: "+joinedFilter);
      } else if (!filtervalue) {
        setfiltervalue(filterVal);
        // console.log("Added First Filter: "+filterVal);
      }
    } else if (!ifFilterApplied) {
      if (filtervalue) {
        let index = filtervalue.indexOf(filterVal);
        // three cases: if filter is at start, middle or end
        // case 1: if filter removed was at beginning
        let sizeOfFilter = filterVal.length;
        if (index === 0) {
          joinedFilter = joinedFilter.substring(sizeOfFilter + 1);
          setfiltervalue(joinedFilter);
          // console.log("Removed filter from beginning: "+filterVal);
        }
        // case 2: if filter removed was at last
        else if (index === filtervalue.length - sizeOfFilter) {
          joinedFilter = joinedFilter.substring(0, index - 1);
          setfiltervalue(joinedFilter);
          // console.log("Removed filter from end: "+filterVal);
        }
        // case 3: if filter to be removed is somewhere inside filtervalue
        else if (index > 0 && index < filtervalue.length - sizeOfFilter) {
          let stringReplaced = "".concat(" ", filterVal, " ");
          joinedFilter = joinedFilter.replace(stringReplaced, " ");
          setfiltervalue(joinedFilter);
          // console.log("Removed filter from middle: "+filterVal);
        }
      }
    }
  };

  const handleSearch = (event) => {
    setsearch(event.target.value.toLowerCase());
    const searchdata = data.filter(checkSearch);
    setsearchResult(searchdata);
  };

  // basic search; only searches for color now
  function checkSearch(obj) {
    let searchdata = document.getElementById("searchbox").value.trim();
    if (
      obj["color"]?.toLowerCase().includes(searchdata) ||
      obj["type"]?.toLowerCase().includes(searchdata) ||
      obj["name"]?.toLowerCase().includes(searchdata)
    ) {
      return true;
    } else return false;
  }

  //fetching data from api only once using useEffect with empty dependency array
  useEffect(() => {
    fetch(
      `https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setdata(actualData);
        seterror(null);
      })
      .catch((err) => {
        seterror(err.message);
        setdata(null);
      })
      .finally(() => {
        setloading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      {/* main has children: main__filter and main__products */}
      {/* main__products has children: main__products__search and main__products__searchResults */}
      {/* if no search string is provided then all products will be rendered as cards inside searchResults. */}
      <div className="main">
        <div className="main__filter">
          <h2 className="main__filter__title">Filter</h2>
          <h4 className="filter__category">COLOR</h4>
          {["Black", "Blue", "White", "Grey", "Purple", "Green", "Yellow"].map(
            (name) => (
              <label key={name}>
                <input
                  id={name}
                  key={name}
                  type="checkbox"
                  multiple
                  value={name}
                  onChange={handleFilter}
                />
                {name}
              </label>
            )
          )}

          <h4 className="filter__category">GENDER</h4>
          {["Men", "Women"].map((name) => (
            <label key={name}>
              <input
                id={name}
                key={name}
                type="checkbox"
                multiple
                value={name}
                onChange={handleFilter}
              />
              {name}
            </label>
          ))}

          <h4 className="filter__category">PRICE</h4>
          {["0-Rs.250", "Rs.251-Rs.450", "> Rs.450"].map((name) => (
            <label key={name}>
              <input
                id={name}
                key={name}
                type="checkbox"
                multiple
                value={name}
                onChange={handleFilter}
              />
              {name}
            </label>
          ))}

          <h4 className="filter__category">TYPE</h4>
          {["Polo", "Hoodie", "Basic"].map((name) => (
            <label key={name}>
              <input
                id={name}
                key={name}
                type="checkbox"
                multiple
                value={name}
                onChange={handleFilter}
              />
              {name}
            </label>
          ))}
        </div>
        <div className="main__products">
          <div className="main__products__search">
            <h2 className="main__products__search__title">Search Products</h2>
            <input
              autoFocus={true}
              type="text"
              name="search"
              id="searchbox"
              onChange={handleSearch}
              value={search}
              placeholder="color/name/type"
            />
          </div>
          <div className="main__products__searchResults">
            {loading && <div>A moment please...</div>}
            {error && (
              <div>{`There is a problem fetching the get data - ${error}`}</div>
            )}


            {/* if only search provided then searchResult   */}
            {!filtervalue && search !== "" &&
              searchResult &&
              searchResult.map(({ id, name, imageURL, price, gender }) => (
                <Card
                  key={id}
                  imglink={imageURL}
                  title={name}
                  price={price}
                  gender={gender.charAt(0)}
                />
              ))}

            {/* if only filters provided then filterData  */}
            {search === "" && filtervalue &&
              filterData &&
              filterData.map(({ id, name, imageURL, price, gender }) => (
                <Card key={id} imglink={imageURL} title={name} price={price} gender={gender.charAt(0)} />
              ))}

            {/* if not filter provided and no search given then output raw data   */}
            {!filtervalue && search === "" &&
              data &&
              data.map(({ id, name, imageURL, price, gender }) => (
                <Card
                  key={id}
                  imglink={imageURL}
                  title={name}
                  price={price}
                  gender={gender.charAt(0)}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
