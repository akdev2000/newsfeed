import { InputBase } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NewsContent } from "../components/NewsContent";
import { Search } from "../components/Search";
import { api_url } from "../helpers/utils";

const pageSize = 30;

export function SearchPage() {
  const [page, setPage] = useState(0);
  const [newsInfo, setNewsInfo] = useState({} as any);
  const [tags, setTags] = useState("all"); // all, story, comment
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState(""); // byPopularity, byDate
  const [dateRange, setDateRange] = useState("all");
  const [extraQueries, setExtraQueries] = useState("");

  useEffect(() => {
    setNewsInfo({});
    fetch(`${api_url}/search?query=${query}${extraQueries}`)
      .then((res) => res.json())
      .then((news) => {
        setNewsInfo(news);
      })
      .catch((err) => {});
  }, [page, query, extraQueries, dateRange]);

  useEffect(() => {
    if (tags == "story" || tags == "comment") {
      setExtraQueries(`&tags=${tags}`);
    } else {
      setExtraQueries("");
    }
  }, [tags]);

  //   useEffect(() => {
  //     if (searchBy == "popularity") {
  //       setExtraQueries(extraQueries + "&numericFilters=points>0");
  //     }
  //     if (searchBy == "date") {
  //       setExtraQueries(
  //         extraQueries + `&numericFilters=created_at_i<${new Date().getTime()}`
  //       );
  //     }
  //   }, [searchBy]);

  useEffect(() => {
    const d = new Date();
    if (dateRange == "last24") {
      d.setDate(d.getDate() - 3);
      console.log(d.getTime(), new Date().getTime());
      setExtraQueries(
        extraQueries + `&numericFilters=created_at_i>=${d.getTime() / 1000}`
      );
    } else {
      setExtraQueries("");
    }
  }, [dateRange]);

  useEffect(() => {
    console.log(newsInfo);
  }, [newsInfo]);
  return (
    <div className="flex flex-col items-center justify-center font-sans">
      <div className="w-4/5 bg-[#ff6600]">
        <div className="flex space-x-1 p-0.5 items-center space-x-2">
          <img src="logosearch.webp" className="w-14 h-14" />
          <div className="flex items-center w-full space-x-5">
            <Link to="/" style={{ lineHeight: 1 }} className="text-[18px]">
              Search
              <br />
              Hacker News
            </Link>
            <div className="flex bg-[#fff] items-center w-4/5 h-10">
              <span className="text-[#ff6600] ml-3 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search stories by title, url and author"
                inputProps={{ "aria-label": "search google maps" }}
                style={{ fontFamily: "Verdana" }}
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f6f6ef] w-4/5 p-2 ">
        <div className="flex text-[12px] space-x-2 items-center mt-1 mb-2">
          <p>Search</p>
          <select
            id="search"
            name="search"
            onChange={(event) => setTags(event.target.value)}
          >
            <option value="all">All</option>
            <option value="story">Stories</option>
            <option value="comment">Comments</option>
          </select>

          <p>by</p>
          <select
            id="searchBy"
            name="searchBy"
            onChange={(event) => setSearchBy(event.target.value)}
          >
            <option value="popularity">Popularity</option>
            <option value="date">Date</option>
          </select>
          <p>for</p>
          <select
            id="searchFor"
            name="searchFor"
            onChange={(event) => setDateRange(event.target.value)}
          >
            <option value="alltime">All time</option>
            <option value="last24">Last 24h</option>
          </select>
        </div>
        {newsInfo?.hasOwnProperty("hits") ? (
          newsInfo?.hits?.length > 0 ? (
            newsInfo?.hits?.map((news: any, index: number) => {
              return (
                <Search
                  newsInfo={news}
                  key={index}
                  id={page * pageSize + index + 1}
                  highlight={query}
                />
              );
            })
          ) : (
            <p>No record found</p>
          )
        ) : (
          <p>Loading ...</p>
        )}
        <div className="ml-10 cursor-pointer">
          {!newsInfo?.exhaustiveNbHits && newsInfo?.hasOwnProperty("hits") && (
            <a
              onClick={() => {
                setPage(page + 1);
                if (window) {
                  window?.scrollTo(0, 0);
                }
              }}
            >
              More
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
