import cookie from 'react-cookie';

export function bearer ( request ){
    // check local storage for token
    var token = cookie.load('authToken');
    if ( token ) {
        request.set( 'Authorization', 'Bearer ' + token );
    }
}

export const getToken = () => cookie.load('authToken');