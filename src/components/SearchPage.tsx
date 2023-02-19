import { useEffect } from "react";

interface Props {
  title: string;
  url: string;
  author: string;
  created_at: Date;
  points: number;
  num_comments: number;
}

export function SearchPage(props: { id: number,newsInfo: Props, className:string }) {
  useEffect(() => {
    console.log("Props Info : ", props?.newsInfo);
  }, [props?.newsInfo]);
  return (
    <div className={`flex space-x-1 font-sans text-[14px] ${props.className}`}>
      <div>
        <p>{props?.id}. </p>
      </div>
      <div className="flex flex-col">
        <div className="flex space-x-1 items-center">
          <img src="greyarrow.gif" />
          <p>{props?.newsInfo.title}</p>
          <p className="text-[#828282] text-[11px]">{`(${props?.newsInfo.url})`}</p>
        </div>
        <div className="text-[9px] text-[#828282] flex space-x-1">
          <p>
            {props?.newsInfo.points} points by {props?.newsInfo.author}{" "}
            {/* {diff_minutes(new Date(), new Date(props?.newsInfo.created_at))} minutes ago */}
          </p>
          <p>|</p>
          <a href="#">hide </a>
          <p>|</p>
          <a>past</a>
          <p>|</p>
          <a>dismiss</a>
        </div>
      </div>
    </div>
  );
}

function diff_minutes(dt2: Date, dt1: Date) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
}
