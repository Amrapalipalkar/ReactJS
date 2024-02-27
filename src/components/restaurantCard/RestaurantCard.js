import React from "react";
import "./restaurantCard.css";
import { CDN_URL } from "../../utils/constants";

const RestaurantCard = (props) => {
    const { resData } = props;
    const { cloudinaryImageId, name, cuisines, costForTwo, avgRatingString, sla } = resData?.info;
    return (
        <div className="restaurant-card" style={{backgroundColor : "#f0f0f0"}}>
            <img className="restaurant-logo" alt="restaurant-logo" src={CDN_URL + cloudinaryImageId}/>
            <h3>{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRatingString} stars</h4>
            <h4>{costForTwo}</h4>
            <h4>{sla?.slaString}</h4>
        </div>
    );
  }
  export default RestaurantCard;