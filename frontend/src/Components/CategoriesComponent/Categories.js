import axios from "axios";
import React, { useEffect, useState } from "react";
import Profession from "./Profession";

function Categories() {
  const [profession, setProfession] = useState([]);

  useEffect(() => {
    getProfession();
  }, []);

  function getProfession() {
    axios.get("/admin/get-all-professions").then(({data}) => {
     
      setProfession(data);
    });
  }

  return (
    <div className=" ">
      <div className="text-center text-3xl mt-10 font-bold ">
        Find Professionals by Category{" "}
      </div>
      <span className="  grid md:grid-cols-3 sm:grid-cols-1   gap-4     ">
        {profession.map( (data, index) => 
        ( <>
            
            <Profession
              title={data.profession_name}
              image={
                data.cloudinary_url
              }
            />
          </>)
        )}
      </span>
    </div>
  );
}

export default Categories;
