import React from 'react'

const About = () => {
  return (
    <>
      <div className='flex justify-around gap-4 w-full h-96 p-4 border-b-1 rounded-lg mb-4'>
        <div>
          <h1 className='text-7xl mt-20 font-bold text-gray-800'>About Us</h1>
        </div>

        <img className='object-fill'
          src="https://thumbs.dreamstime.com/b/cartoon-coach-bus-clipart-illustration-white-background-drawn-simple-style-bright-colors-s-perfect-336068470.jpg" alt="" />
      </div>
      <div className='grid justify-items-center p-8'>
        <h2 className='text-4xl py-4'>Know Us</h2>
        <p className='w-[50cqw] text-2xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
           Velit sapiente aperiam ipsum iusto sint ad. Suscipit voluptate amet quo 
           nemo recusandae nihil, eaque, explicabo ullam, numquam aliquid magnam aut
            voluptas!</p>
      </div>

    </>
  )
}

export default About