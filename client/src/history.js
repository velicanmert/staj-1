// // We are going to maintain the history object as opposed
// // to React-router (Section 20, Lecture 252).
// // Note that history package is automaticall installed with
// // react-router-dom:
//
// import createHistory from 'history/createBrowserHistory';

// export default createHistory();

// As of React Router DOM v4.4.0 you will get a warning in your console:

// Warning: Please use `require("history").createBrowserHistory` instead of `require("history/createBrowserHistory")`. Support for the latter will be removed in the next major release.

// To fix, our history.js file should instead look like this:

import { createBrowserHistory } from 'history';
export default createBrowserHistory();
