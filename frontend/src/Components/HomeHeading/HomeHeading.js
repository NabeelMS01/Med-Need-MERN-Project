import React from 'react'

function HomeHeading() {
  return (
    <div class="relative overflow-hidden bg-white">
  <div class="mx-auto max-w-7xl">
    <div class="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
      <svg class="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polygon points="50,0 100,0 50,100 0,100" />
      </svg>

     

      <main class="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <div class="sm:text-center lg:text-left">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span class="block xl:inline">Hire best medical profesional </span>
            <span style={{color:"#257069"}} class="block  xl:inline">online </span>
          </h1>
          <p class="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">Medneed is a platform for hiring best in home medical care 
professionals.  </p>
          <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div class="rounded-md shadow">
              <a style={  {  backgroundColor:"#257069",cursor:"pointer", }}  class="flex w-full items-center justify-center rounded-md border border-transparent   px-8 py-3 text-base font-medium text-white  md:py-4 md:px-10 md:text-lg  ">Hire a professional</a>
            </div>
            <div class="mt-3 sm:mt-0 sm:ml-3">
              <a style={{ cursor:"pointer", color:"#257069"}}   class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-
100 px-8 py-3 text-base font-medium   hover:bg-indigo-200 md:py-4 md:px-10 md:text-lg">Work with Us</a>            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
    <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full" src="https://res.cloudinary.com/nabeelms/image/upload/v1661806081/Frame_9_g4fqot.png" alt=""/>
  </div>
</div> 
  )
}

export default HomeHeading