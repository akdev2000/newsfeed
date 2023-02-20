import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NewsContent } from "../components/NewsContent";

const pageSize = 30;

export function Home(props: any) {
  const [page, setPage] = useState(0);
  const [newsInfo, setNewsInfo] = useState({} as any);
  const [searchValue, setSearchValue] = useState("");
  const currentRef = React.createRef();
  const navigate = useNavigate();
  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/search_by_date?tags=story&hitsPerPage=30&page=${page}`;
    console.log(
      "process.env.REACT_APP_API_URL ",
      process.env.REACT_APP_API_URL,
      url
    );
    fetch(url)
      .then((res) => res.json())
      .then((news) => {
        setNewsInfo(news);
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  }, [page]);

  useEffect(() => {
    console.log(newsInfo);
  }, [newsInfo]);
  return (
    <div className="flex flex-col items-center justify-center font-sans mt-2">
      <div className="w-5/6 bg-[#ff6600] p-1" style={{ lineHeight: "17px" }}>
        <div className="flex space-x-1 items-center">
          <img
            src="y18.gif"
            style={{ border: "1px solid white", height: 18, width: 18 }}
          />
          <div className="flex items-center space-x-1">
            {/* <div> */}
            <strong className="text-[13.3px]">Hacker News</strong>
            {/* </div> */}
            <div className="ml-5 flex items-center space-x-1 text-[14px]">
              <a className="text-[#fff]">new</a>
              <a>|</a>
              <a>past</a>
              <a>|</a>
              <a>comments</a>
              <a>|</a>
              <a>ask</a>
              <a>|</a>
              <a>show</a>
              <a>|</a>
              <a>jobs</a>
              <a>|</a>
              <a>submit</a>
              {/* <p> | </p> */}
              {/* <Link to="/search">search</Link> */}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f6f6ef] w-5/6 pt-2 pb-12 mb-5">
        {newsInfo?.hasOwnProperty("hits") ? (
          newsInfo?.hits?.map((news: any, index: number) => {
            return (
              <NewsContent
                newsInfo={news}
                key={index}
                id={page * pageSize + index + 1}
              />
            );
          })
        ) : (
          <p>Loading ...</p>
        )}
        <div className="ml-10 cursor-pointer text-[14px] mt-3 mb-5">
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
        <div className="bg-[#ff6600] h-[2px] w-full"></div>
        <div className="text-center">
          <p className="text-[10.6px] mt-3">
            Guidelines | FAQ | Lists | API | Security | Legal | Apply to YC |
            Contact
          </p>
          <div className="mt-5 flex items-center justify-center">
            <p className="text-[#828282] mr-2 text-[14px]">Search:</p>
            <form
              onSubmit={() => {
                navigate(`search/${searchValue}`);
              }}
            >
              <input
                type="text"
                name="q"
                size={17}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="false"
                className="box-border border-[1px] border-[#828282] h-[22px]"
                value={searchValue}
                onChange={(event) => {
                  setSearchValue(event?.target.value);
                }}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
