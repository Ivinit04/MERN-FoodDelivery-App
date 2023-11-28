import React, { useState } from "react";

export default function Carousel(props) {

  const [searchText , setSearchText] = useState('');

  function handleOnChange(event){
    setSearchText(event.target.value);
  }

  return (
    <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner" style={{ maxHeight: "500px" }}>
          <div
            className="carousel-caption d-none d-md-block"
            style={{ zIndex: "10" }}
          >
            <form className="d-flex" role="search" onSubmit={(event)=>{
              event.preventDefault();
              props.onSearch(searchText);
              setSearchText('');
            }}>
              <input
              onChange={handleOnChange}
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchText}
              />
              <button
                className="btn btn-outline-success text-white bg-success"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>

          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/800x800?burger"
              style={{ filter: "brightness(40%)" , maxHeight: "500px" , objectFit: "cover !important"}}
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/800x800?pizza"
              style={{ filter: "brightness(40%)" , maxHeight: "500px" , objectFit: "cover !important"}}
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/800x800?icecream"
              style={{ filter: "brightness(40%)" , maxHeight: "500px" , objectFit: "cover !important"}}
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
