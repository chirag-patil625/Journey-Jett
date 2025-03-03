import React, { useState } from 'react';

const Search = (props) => {
  const [focus, setFocus] = useState(false);

  const handleInputFocus = () => {
    setFocus(true);
  };

  const handleInputBlur = () => {
    setFocus(false);
  };

  return (
    <>
      <div className='border-2 lg:w-56 w-40 h-auto flex flex-col bg-white p-3 rounded-xl'>
        <h1 className='text-xl text-gray-500 mb-1'>{props.title}</h1>
          <input type={props.type} value={props.input} onFocus={handleInputFocus} onBlur={handleInputBlur} onChange={(e) => props.fn(e.target.value)} className={`lg:h-12 md:h-8 border-2 rounded-xl font-bold ${props.size} border-gray-100 focus:outline-none`} />
          <h1 className={`${focus ? "block" : "hidden"} border-2 border-white`}>hii</h1>
      </div>
    </>
  );
};

export default Search;
