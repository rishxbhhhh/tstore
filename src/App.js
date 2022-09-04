import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Card from "./components/Card/Card";
import Cart from "./components/Cart/Cart";

function App() {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);
  const [search, setsearch] = useState("");
  const [searchResult, setsearchResult] = useState(null);
  const [filtervalue, setfiltervalue] = useState(null);
  const [filterData, setfilterData] = useState(null);
  const [isCartOpen, setisCartOpen] = useState(false);
  const [total,settotal] = useState(0);

  // const [cartData , setcartData] = useState([]);
  const cartBtnHandler = (event) => {
    if (!isCartOpen) setisCartOpen(true);
    else setisCartOpen(false);
  };

  
  // // to check if filtervalue is being updated and also to re render the filtered data
  useEffect(() => {
    if (filtervalue) {
      const filterArray = filtervalue.split(" ");
      let tempData;
      let filteredDataByColor;
      let filteredDataByGender;
      let filteredDataByType;
      let filteredDataByPrice;
      let filtersSelectedInEachCategory = [0, 0, 0, 0]; // color, gender, type, price
      // counting filters in each category which are selected
      filterArray.forEach((filter) => {
        if (
          [
            "black",
            "blue",
            "white",
            "grey",
            "purple",
            "green",
            "yellow",
            "pink",
            "red",
          ].includes(filter)
          )
          filtersSelectedInEachCategory[0]++;
          else if (["men", "women"].includes(filter))
          filtersSelectedInEachCategory[1]++;
        else if (["basic", "hoodie", "polo"].includes(filter))
        filtersSelectedInEachCategory[3]++;
        else if (["0-rs.250", "rs.251-rs.450", ">rs.450"].includes(filter))
          filtersSelectedInEachCategory[2]++;
        });

      console.log(filtersSelectedInEachCategory);

      // category 1: color
      if (filtersSelectedInEachCategory[0] > 0) {
        filterArray.forEach((filter) => {
          tempData = data.filter((obj) => {
            if (obj["color"]?.toLowerCase() === filter) {
              return true;
            } else return false;
          });
          filteredDataByColor = Array.from(
            new Set(filteredDataByColor?.concat(tempData) || tempData)
            );
            // setfilterData(filteredDataByColor);  // do not uncomment or delete
          });
        
        }
        
        // category 2: gender
        if (filtersSelectedInEachCategory[1] > 0) {
          filterArray.forEach((filter) => {
            tempData = data.filter((obj) => {
            if (obj["gender"]?.toLowerCase() === filter) {
              return true;
            } else return false;
          });
          filteredDataByGender = Array.from(
            new Set(filteredDataByGender?.concat(tempData) || tempData)
            );
            // setfilterData(filteredDataByGender);  // do not uncomment or delete
          });
          
        }
        
        // // category 3: price
        if (filtersSelectedInEachCategory[2] > 0) {
          filterArray.forEach((filter) => {
          tempData = data.filter((obj) => {
            let result = false;
            if (filter === "0-rs.250") {
              if (obj["price"] >= 0 && obj["price"] <= 250) {
                result = true;
              }
            }
            else if (filter === "rs.251-rs.450") {
              if (obj["price"] >= 251 && obj["price"] <= 450) {
                result = true;
              }
            }
            else if (filter === ">rs.450") {
              if (
                obj["price"] > 450 &&
                obj["price"] <= Number.MAX_SAFE_INTEGER
                ) {
                  result = true;
              }
            }
            return result;
          });
          filteredDataByPrice = Array.from(
            new Set(filteredDataByPrice?.concat(tempData) || tempData)
            );
            
            //     setfilterData(filteredDataByPrice); // do not uncomment or delete
          });
        
      }
      
      // category 4: type
      if (filtersSelectedInEachCategory[3] > 0) {
        filterArray.forEach((filter) => {
          tempData = data.filter((obj) => {
            if (obj["type"]?.toLowerCase() === filter) {
              return true;
            } else return false;
          });
          filteredDataByType = Array.from(
            new Set(filteredDataByType?.concat(tempData) || tempData)
          );
          // setfilterData(filteredDataByType); // do not uncomment or delete
        });
        
      }
      
      // Now we have to select common in all these different filteredData with different categories
      let arrays = [data, data, data, data];
      if (filtersSelectedInEachCategory[0] > 0) arrays[0] = filteredDataByColor;
      if (filtersSelectedInEachCategory[1] > 0)
      arrays[1] = filteredDataByGender;
      if (filtersSelectedInEachCategory[2] > 0) arrays[2] = filteredDataByPrice;
      if (filtersSelectedInEachCategory[3] > 0) arrays[3] = filteredDataByType;
      tempData = arrays.shift().reduce(function (res, v) {
        if (
          res.indexOf(v) === -1 &&
          arrays.every(function (a) {
            return a.indexOf(v) !== -1;
          })
          )
          res.push(v);
        return res;
      }, []);

      setfilterData(tempData);
    }
  }, [filtervalue, data]);
  
  const handleFilter = (event) => {
    let filterVal = event.target.value.toLowerCase();
    let ifFilterApplied = event.target.checked;
    let joinedFilter = filtervalue;
    if (ifFilterApplied) {
      if (filtervalue) {
        joinedFilter = filtervalue.concat(" ", filterVal);
        setfiltervalue(joinedFilter);
        
      } else if (!filtervalue) {
        setfiltervalue(filterVal);
        
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
          
        }
        // case 2: if filter removed was at last
        else if (index === filtervalue.length - sizeOfFilter) {
          joinedFilter = joinedFilter.substring(0, index - 1);
          setfiltervalue(joinedFilter);
          
        }
        // case 3: if filter to be removed is somewhere inside filtervalue
        else if (index > 0 && index < filtervalue.length - sizeOfFilter) {
          let stringReplaced = "".concat(" ", filterVal, " ");
          joinedFilter = joinedFilter.replace(stringReplaced, " ");
          setfiltervalue(joinedFilter);
          
        }
      }
      let filteredDataByColor = filterData.filter((obj) => {
        if (
          obj["color"]?.toLowerCase() === filterVal ||
          obj["gender"]?.toLowerCase() === filterVal ||
          obj["type"]?.toLowerCase() === filterVal
          ) {
            return false;
          } else return true;
        });
        setfilterData(filteredDataByColor);
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

  useEffect(()=>{
    let temp=0;
    data?.forEach((obj)=>{
      temp+=(obj?.price*obj?.quantity);
    });
    settotal(temp);
  },[data,total]);
  

  // problem: adding products to cart (cart not functional, only UI designed)
  return (
    <>
      <Cart
        cartData={data}
        isCartOpen={isCartOpen}
        total={total}
      />
      <Navbar cartBtnHandler={cartBtnHandler} isCartOpen={isCartOpen} />
      {/* main has children: main__filter and main__products */}
      {/* main__products has children: main__products__search and main__products__searchResults */}
      {/* if no search string is provided then all products will be rendered as cards inside searchResults. */}
      <div className="main">
        <div className="main__filter">
          <h2 className="main__filter__title">Filter</h2>
          <h4 className="filter__category">COLOR</h4>
          {[
            "Black",
            "Blue",
            "White",
            "Grey",
            "Purple",
            "Green",
            "Yellow",
            "Pink",
            "Red",
          ].map((name) => (
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
          {["0-rs.250", "rs.251-rs.450", ">rs.450"].map((name) => (
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
              autoFocus={false}
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
            {!filtervalue &&
              search !== "" &&
              searchResult &&
              searchResult.map((product) => (
                <Card
                  key={product?.id}
                  imglink={
                    product?.imageURL ||
                    "https://cdn2.thecatapi.com/images/d8k.jpg"
                  }
                  title={product?.name || "Temp"}
                  price={product?.price || 0}
                  gender={product?.gender.charAt(0) || "-"}
                  quantity={product?.quantity || 0}
                />
              ))}

            {/* if only filters provided then filterData  */}
            {search === "" &&
              filtervalue &&
              filterData &&
              filterData.map((product) => (
                <Card
                key={product?.id}
                imglink={
                  product?.imageURL ||
                  "https://cdn2.thecatapi.com/images/d8k.jpg"
                }
                  title={product?.name || "Temp"}
                  price={product?.price || 0}
                  gender={product?.gender.charAt(0) || "-"}
                  quantity={product?.quantity || 0}
                  />
              ))}

            {/* if no filter provided and no search given, then output should be raw data   */}
            {!filtervalue &&
              search === "" &&
              data &&
              data.map((product) => (
                <Card
                  key={product?.id}
                  imglink={
                    product?.imageURL ||
                    "https://cdn2.thecatapi.com/images/d8k.jpg"
                  }
                  title={product?.name || "Temp"}
                  price={product?.price || 0}
                  gender={product?.gender.charAt(0) || "-"}
                  quantity={product?.quantity || 0}
                />
              ))
              }
          </div>
        </div>
      </div>
      <div className="footer">
        Made with ❤️ and React JS by{" "}
        <a href="https://rishxbhhhh.github.io/frontend_react" id="footer__link">
          Rishabh Rajpurohit
        </a>{" "}
        &copy; 2022
      </div>
    </>
  );
}

export default App;
