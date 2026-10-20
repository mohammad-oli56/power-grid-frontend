
"use client";
;
import { useParams } from "next/navigation";
import SingleOutage from "../../../_component/SingleOutage";


const Page = () => {
  const params = useParams();
  const id = params.id as string;

console.log(id)

  return (
    <div>
      <SingleOutage id={id}></SingleOutage>
    </div>
   
  );
};

export default Page;
