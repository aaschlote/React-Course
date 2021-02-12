import React from 'react';

const userInput = (props) => {
  return (
    <div>
      <input type="text" onChange={props.change} />
    </div>
  );
};

export default userInput;
