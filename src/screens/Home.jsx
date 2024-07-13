import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import axios from "axios";
import Footer from "../components/Footer";

export default function Home() {
  const [foodItems, setFoodItems] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [search, setSearch] = useState("");

  // This useEffect will only run once right after the initial render of the component due to using an empty dependency array.
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post("https://mern-food-delivery-app-backend.vercel.app/api/food");
      const result = response.data;
      console.log(result[1]);
      setFoodItems(result[0]);
      setFoodCategories(result[1]);
      //cannot log it inside a loadData function due to asynchronous nature of states, setFoodItems might not have been updated yet when you log the statement.
      // console.log(foodItems);
    };

    fetchData();
  }, []);

  // This useEffect runs whenever foodItems changes
  useEffect(() => {
    console.log(foodItems);
  }, [foodItems]);

  function handleSearch(text) {
    setSearch(text);
  }
  //To see search text
  // useEffect(()=>{
  //   console.log(search);
  // }, [search]);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div>
        <Carousel onSearch={handleSearch} />
      </div>
      <div className="container" style={{maxWidth: "100%"}}>
      <div className="container m-3" style={{maxWidth: "100%"}}>
        {foodCategories.length > 0
          ? foodCategories.map((category, index) => {
              return (
                <div key={index} className="row">
                  <div key={category._id} className="fs-3 m-3">
                    {category.CategoryName}
                  </div>

                  <hr />
                  {foodItems.length > 0
                    ? foodItems
                        .filter((item) => {
                          return (
                            item.CategoryName === category.CategoryName &&
                            item.name
                              .toLocaleLowerCase()
                              .includes(search.toLocaleLowerCase())  //filter those items whose name includes the searched text
                          );
                        })
                        .map((filterItem) => {
                          return (
                            <div
                              key={filterItem._id}
                              className="col-12 col-md-6 col-lg-4 col-xl-3"
                            >
                              <Card
                                foodItem = {filterItem}
                              />
                            </div>
                          );
                        })
                    : ""}
                </div>
              );
            })
          : ""}
      </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
