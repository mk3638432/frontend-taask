"use client";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Rating } from "@mui/material";

const Card = ({ searchQuery, selectedValue }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      console.log(productId);
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      const productToAdd = data?.products.find(
        (product) => product.id === productId
      );
      if (productToAdd) {
        console.log(productId);
        setFavorites([...favorites, productId]);
      }
    }
  };

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "https://dummyjson.com/products";

        if (searchQuery) {
          url = `https://dummyjson.com/products/search?q=${searchQuery}`; // Use search query if available
        } else if (selectedValue) {
          url = `https://dummyjson.com/products/category/${selectedValue}`; // Use selected value if available
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, selectedValue]);
  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div className="py-4   grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data?.products ? (
            <>
              {" "}
              {data?.products
                ?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((product, index) => (
                  <div
                    key={index}
                    className="max-w-sm rounded overflow-hidden shadow-lg"
                  >
                    <div className="flex ">
                      <img
                        className="w-[200px] h-[200px] px-4 "
                        src={product?.images[0]}
                        alt="Sunset in the mountains"
                      />
                      <FavoriteIcon
                        size="large"
                        className="cursor-pointer"
                        style={{
                          color: favorites.includes(product.id)
                            ? "red"
                            : "grey",
                        }}
                        onClick={() => toggleFavorite(product.id)}
                      />
                    </div>

                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">
                        {product?.title}
                      </div>
                      <p className="text-gray-700 text-base">
                        {product?.description}
                      </p>
                    </div>
                    <div className="px-6 flex flex-col pt-4 pb-2">
                      <span className="inline-block px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        ${product?.price}
                      </span>
                      <span className="inline-block px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        <Rating
                          name="read-only"
                          value={product?.rating}
                          precision={0.5}
                          readOnly
                        />
                      </span>
                    </div>
                  </div>
                ))}
            </>
          ) : (
            "THEIR IS NO SUCH PRODUCT"
          )}
        </div>
      )}
      <Stack spacing={2} className="flex justify-center items-center my-4">
        <Typography>Page: {page}</Typography>
        <Pagination
          count={Math.ceil(data?.products?.length / itemsPerPage)}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </>
  );
};

export default Card;
