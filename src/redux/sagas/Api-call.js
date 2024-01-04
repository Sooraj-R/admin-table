
// import React, { useState, useEffect } from "react";

// const App = () => {
//   const [posts, setPosts] = useState([]);

//   const getData = () => {
//     var requestOptions = {
//       method: "GET",
//       redirect: "follow",
//     };

//     fetch("http://localhost:3030/posts", requestOptions)
//       .then((response) => response.json())
//       .then((result) => setPosts(result))
//       .catch((error) => console.log("error", error));
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <div>
//       {posts.map((post) => (
//         <div key={post.id}>
//           <h3>
//             <span>{post.id}</span> {post.title}
//           </h3>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default App;

import axios from 'axios';

export const commonApiCall = (options) => async () => {
  const { url, method, params, body } = options;
  return axios.request({
    url,
    method,
    params,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    data: body
  })
    .then(
      (res) => {
        return res;
      }, (error) => {
        if (error) {
          console.log("====================>>>>>>>Error")
        }
      }
    )
}
