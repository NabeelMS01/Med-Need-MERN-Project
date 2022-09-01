import React from 'react'

function Profession({title,image}) {
  return (
   
<div>
<div class="max-w-xs rounded-2xl     overflow-hidden shadow-xl items-center m-auto mt-5 transition-all cursor-pointer hover:max-w-sm relative  ">
  <img className="w-2/6 m-auto mt-5" src={image} alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2 text-center ">{title}</div>
    
  </div>
   
</div>
</div>
  )
}

export default Profession