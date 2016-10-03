import React, { PropTypes } from 'react';
import BottomBar from '../components/BottomBar';

const Main =(props)=>{
	return (
    <div id="holder">

    {/*<Headroom><TopBar/></Headroom>*/}

    <div id="body">
      {props.children}
    </div>
    {/*<Snackbar />*/}
    <BottomBar/>

    </div>
    );
}


Main.propTypes = {
  children: PropTypes.element
};

export default Main;
