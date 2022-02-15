import React from 'react';
const headerCSS ={
  display:'flex',
  justifyContent:'center',
  backgroundColor:'royalblue'
}
function HeaderComponent() {
  return (
      <header style={headerCSS}>
          <h1 >Meme Generator</h1>
      </header>
  );
}

export default HeaderComponent;
