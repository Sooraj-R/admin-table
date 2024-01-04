import React, { useState, useEffect } from "react";
import { Provider } from 'react-redux';
import { store } from './redux/Store-config';
import AdminContainer from './container/AdminContainer'
import './App.css'

const App = () => {
  const [posts, setPosts] = useState([]);

  const getData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3030/admin_dashboard", requestOptions)
      .then((response) => response.json())
      .then((result) => setPosts(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Provider store={store}>
        <AdminContainer/>
          {/* {posts.map((post) => (
            <div key={post.id}>
              <h3>
                <span>{post.id}</span> {post.title}
              </h3>
            </div>
          ))} */}
    </Provider>

  );
};

export default App;