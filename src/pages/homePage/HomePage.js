import React, { useState, useEffect } from "react";
import "./homePage.css";
import RestaurantCard from "../../components/restaurantCard/RestaurantCard";
import Header from "../../components/header/Header";
import Shimmer from "../../components/shimmer/Shimmer";
// import resList from "../../utils/mockData";

const HomePage = () => {
  const [mockData, setMockData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.0759837&lng=72.8776559&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await response.json();
      const restaurants =
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      //optional Chaining
      setMockData(restaurants);
      setSearchData(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //conditional Rendering
  // if(mockData.length == 0) {
  //   return <Shimmer/>
  // }

  // console.log(mockData, "data");

  return mockData.length == 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="body">
        <div className="search-container filter">
          <div className="search-btn">
            <input
              type="text"
              className="search-box"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <button
              onClick={() => {
                const searchRes = mockData.filter((res) =>
                  res.info.name.toLowerCase().includes(searchText.toLowerCase())
                );
                setSearchData(searchRes);
              }}
            >
              Search
            </button>
          </div>
          <button
            className="filter-btn"
            onClick={() => {
              filteredList = mockData.filter((res) => res.data.rating > 4.4);
              setMockData(filteredList);
            }}
          >
            Top Rated Restaurant
          </button>
        </div>
        <div className="restaurant-container">
          {searchData.map((resCard) => (
            <RestaurantCard key={resCard.info.id} resData={resCard} />
          ))}
        </div>
      </div>
    </>
  );
};
export default HomePage;
