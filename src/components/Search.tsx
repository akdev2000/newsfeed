import { useEffect } from "react";

interface Props {
  title: string;
  url: string;
  author: string;
  created_at: Date;
  points: number;
  num_comments: number;
  comment_text: string;
}

export function Search(props: {
  id: number;
  newsInfo: Props;
  highlight: string;
}) {
  
  return (
    <div className={`flex space-x-1 font-sans text-[14px] m-1`}>
      {/* <div className="text-end w-9 text-[#828282]">
        <p>{props?.id}. </p>
      </div> */}
      <div className="flex flex-col">
        <div className="flex space-x-1 items-center">
          {/* <img src="greyarrow.gif" /> */}
          {
            props.newsInfo?.comment_text ?
            <p>{props?.newsInfo.comment_text}</p> : 
            <p>{props?.newsInfo.title}</p>
          }
          <p className="text-[#828282] text-[11px]">{`(${props?.newsInfo.url})`}</p>
        </div>
        <div className="text-[9px] text-[#828282] flex space-x-1">
          <p>{props?.newsInfo.points} points </p>
          <p>|</p>
          <p>{props?.newsInfo.author}</p>
          <p>|</p>
          <p>
            {diff_minutes(new Date(), new Date(props?.newsInfo.created_at))} ago
          </p>
          <p>|</p>
          <p>{props?.newsInfo.num_comments} comments</p>
        </div>
      </div>
    </div>
  );
}

function diff_minutes(dt2: Date, dt1: Date): string {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  const minutes = Math.abs(Math.floor(diff));
  if (minutes < 60) {
    return `${minutes} minutes`;
  }
  const hour = Math.abs(Math.ceil(minutes / 60));
  if (hour < 24) {
    return `${hour} hour`;
  }
  const day = Math.abs(Math.ceil(hour / 24));
  if (day < 7) {
    return `${day} days`;
  }
  const weeks = Math.abs(Math.ceil(day / 7));
  if (weeks < 4) {
    return `${weeks} weeks`;
  }
  const month = Math.abs(Math.ceil(weeks / 4));
  if (month < 12) {
    return `${month} months`;
  }
  const year = Math.abs(Math.ceil(month / 12));

  return `${year} years`;
}
