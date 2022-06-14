import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { nomationIcon } from "../nominationIcon";
import { filter } from "lodash";

const url = "https://the-one-api.dev/v2/movie";
const apiToken = "JSxN_kZPm24SKg8uRnPw";

const Movies = () => {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("asc");

  const handleSortList = useCallback((e) => {
    const value = e.target.value;

    setSort(value);
  }, []);

  const organizeList = () => {
    const newList = list.sort((a, b) => {
      if (sort === "asc") return a.name.localeCompare(b.name);

      if (a.name > b.name) return -1;

      if (b.name > a.name) return 1;

      return 0;
    });

    if (!filter) return newList;

    return newList.filter(
      (item) => item.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
    );
  };

  const handleFilter = useCallback((e) => {
    const value = e.target.value;

    setFilter(value);
  }, []);

  const getMovies = async () =>
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      })
      .then((response) => {
        console.log(response, "response");
        setList(response.data.docs);
      });

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="container-movies">
      <div className="title">
        <h2>Lord of the Rings Movies</h2>
      </div>

      <div className="filters-info">
        <div className="info">
          <span>Ave movie runtime: xxx min</span>
          <span>Ave movie runtime: xxx min</span>
        </div>
        <div className="filters">
          <input
            type="text"
            name="filters"
            placeholder="Finter movies by name"
            onChange={handleFilter}
          />
          <select name="sort_by_budget" onChange={handleSortList}>
            <option value="asc">asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>
      <div className="container-list">
        {organizeList().map((movie) => {
          return (
            <div className="card">
              <div className="image"></div>
              <div className="info">
                <h3>{movie?.name}</h3>
                <h5 className="value margin-info">
                  {movie?.runtimeInMinutes} min
                </h5>
                <div className="nominations value margin-info">
                  <nomationIcon />
                  {movie?.academyAwardWins} wins &{" "}
                  {movie?.academyAwardNominations} Nominations
                </div>
                <div className="budget-revenue">
                  <div className="budget">
                    <span>Budget</span>
                    <h5 className="value">${movie?.budgetInMillions}M</h5>
                  </div>
                  <div className="budget">
                    <span>Revenue</span>
                    <h5 className="value">${movie?.budgetInMillions}M</h5>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Movies;
