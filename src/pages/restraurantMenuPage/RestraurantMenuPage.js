import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./restraurantMenuPage.css";
import Shimmer from "../../components/shimmer/Shimmer";
import { MEMU_API } from "../../utils/constants";

const RestraurantMenuPage = () => {
  const [resInfo, setResInfo] = useState(null);

  const {resId} = useParams();
  console.log(resId)

  useEffect(() => {
    fetchMenu();
  }, []);

  const url =
    "https://corsproxy.org/?" +
    encodeURIComponent( MEMU_API + resId );

    console.log(url, "url")

  const fetchMenu = async () => {
    try {
      const data = await fetch(url);
      console.log(data, "url")
      const RestaurantsMenu = await data.json();
      const Menu = RestaurantsMenu?.data;
      setResInfo(Menu);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // if (resInfo == null) {
  //   <Shimmer />;
  // }

  console.log(resInfo, "resInfo");
  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[0]?.card?.card?.info ?? {};
  console.log(name, "name");
  const { itemCards } =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
      ?.card ?? {};

  console.log(itemCards, "itemCards");

  return resInfo == null ? (
    <Shimmer />
  ) : (
    <div className="menu">
      <h1>{name}</h1>
      <h3>
        {cuisines} - {costForTwoMessage}
      </h3>
      <h2>Menu</h2>
      <ul>
        {itemCards?.map((item, key) => (
          <li key={item.card.info.id}>
            {item.card.info.name} - {"Rs. "}
            {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestraurantMenuPage;
