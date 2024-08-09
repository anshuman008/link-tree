"use client";
import { Inder } from "next/font/google";
import React, { useEffect, useState } from "react";

const page = () => {
  const [Links, setLinks] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [upIndex, setUpIndex] = useState(null);
  const [tempLink,setTempLink] = useState({name: "",link:""})
  const hadelSubmit = (e: any) => {
    e.preventDefault();
    const newObj = {
      name: e.target.name.value,
      link: e.target.link.value,
    };

    setLinks([...Links, newObj]);
    e.target.name.value = "";
    e.target.link.value = "";
  };

  const handelUpdate = (e:any) => {
    e.preventDefault();
     
    const updatedLinks = [...Links];
         updatedLinks[upIndex] = tempLink;
         setLinks(updatedLinks);
         setIsModelOpen(false);
  };

  const handelDelete = (index:number) => {
    setLinks(Links.filter((li,i)=> i !== index));
  }

  useEffect(() => {
    console.log(Links);
  }, [Links]);

  return (
    <>
      <div className="min-h-screen pb-10 bg-slate-700 text-white flex flex-col justify-center items-center">
        <div className="h-[70%]">
          {/* add todo section  */}
          <div>
            <h1 className="text-3xl font-bold">Your Links!!</h1>
            <button className="p-2 rounded-lg bg-green-400">Add Link</button>

            <form
              onSubmit={hadelSubmit}
              className="flex flex-col p-4 bg-gray-500 gap-y-4 mt-3"
            >
              <label>Name</label>
              <input
                placeholder="ente rthe name"
                name="name"
                className="h-[50px] rounded-lg p-3 text-lg text-black"
              />

              <label>Link</label>
              <input
                placeholder="enter the url"
                name="link"
                className="h-[50px] rounded-lg p-3 text-lg text-black"
              />

              <button type="submit" className="p-3 rounded-lg bg-green-700">
                Save
              </button>
            </form>
          </div>

          {/* todos diplay section  */}
          <div className="mt-10 w-[500px] flex flex-col gap-y-4">
            <h1 className="text-3xl font-bold">All Links</h1>

            {Links.map((li, index) => (
              <div
                key={index}
                className="py-3 w-full bg-gray-500 rounded-lg flex flex-col justify-center items-center gap-y-4"
              >
                <span>{li?.name}</span>
                <span>{li?.link}</span>

                <span className="flex gap-x-5">
                  <button
                    className="p-3 rounded-lg bg-green-400"
                    onClick={() => {
                      setTempLink(Links[index]);
                       setUpIndex(index);
                      setIsModelOpen(true);
                    }}
                  >
                    Update
                  </button>
                  <button className="p-3 rounded-lg bg-red-400" onClick={()=> handelDelete(index)}>Delte</button>
                </span>
              </div>
            ))}
            
          </div>
        </div>
      </div>

      {/* Update Model  */}

      {isModelOpen && (
        <div className="h-screen absolute bg-[#181616b6] w-screen top-0 flex justify-center items-center">
          <div className="w-[400px]">
            <form
              onSubmit={handelUpdate}
              className="flex flex-col p-4 bg-gray-500 gap-y-4 mt-3"
            >
              <label>Name</label>
              <input
                value={tempLink.name}
                onChange={(e)=>{
                  setTempLink((prev) => ({...prev,name:e.target.value}))
                }}
                placeholder="ente rthe name"
                name="name"
                className="h-[50px] rounded-lg p-3 text-lg text-black"
              />

              <label>Link</label>
              <input
                value={tempLink.link}
                onChange={(e)=>{
                  setTempLink((prev) => ({...prev,link:e.target.value}))
                }}
                placeholder="enter the url"
                name="link"
                className="h-[50px] rounded-lg p-3 text-lg text-black"
              />

              <button type="submit" className="p-3 rounded-lg bg-green-700">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
