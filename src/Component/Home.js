import React, { useEffect, useState } from "react";
import { usersGetDate, deteteUser } from "../Redux/Redux";
import { useDispatch, useSelector } from "react-redux";
import "../Css/Home.css";
import { Button } from "bootstrap";
import { useNavigate } from "react-router-dom";
function Home() {
  let [displayUser, setDisplayUser] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  let { users } = useSelector((state) => state.users);

  let dispatch = useDispatch();
  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          dispatch(usersGetDate(json.data));
          shortLIst("A-Z", json.data);
        }
      });
  }, [dispatch]);

  const onDeleteItem = (index) => {
    let list = [...displayUser];
    list.splice(index, 1);
    setDisplayUser([...list]);
  };

  const shortLIst = (short, currentList) => {
    let list = JSON.parse(JSON.stringify([...currentList]));
    if (short === "A-Z") {
      list = list.sort((a, b) => a.first_name.localeCompare(b.first_name));
    } else {
      list = list.sort((a, b) => b.first_name.localeCompare(a.first_name));
    }
    setDisplayUser([...list]);
  };

  let onSearchHandler = (search) => {
    setInput(search);
    if (search !== "") {
      const results = users.filter((user) => {
        return (
          user.first_name.toLowerCase().startsWith(search.toLowerCase()) ||
          user.last_name.toLowerCase().startsWith(search.toLowerCase())
        );
      });
      setDisplayUser(results);
    } else {
      setDisplayUser(users);
    }
  };

  return (
    <>
      <div className="main_rapper">
        <div className="abc">
          <div className="search-container">
            <input
              placeholder="Search..."
              className="search-input"
              onChange={(e) => {
                onSearchHandler(e.target.value);
              }}
            />
            <a href="#" className="search-btn">
              <i className="fas fa-search"></i>
            </a>
          </div>
          <div>
            <button
              onClick={() => {
                navigate("/add-user");
              }}
            >
              Add user
            </button>
          </div>
          <div className="select">
            <select
              onChange={(event) => shortLIst(event.target.value, displayUser)}
              id="select"
            >
              <option value="A-Z">A TO Z</option>
              <option value="Z-A">Z TO A</option>
            </select>
          </div>
        </div>

        <div className="users">
          {displayUser.map((cv, index) => {
            return (
              <>
                <figure class="user_contact" key={index}>
                  <div className="users_img">
                    {" "}
                    <img src={cv.avatar} alt="Something Went Wrong" className="profile" />
                  </div>
                  <div className="users_name_email">
                    <figcaption>
                      <h2>
                        {cv.first_name} {cv.last_name}
                      </h2>
                    </figcaption>
                  </div>

                  <button className="btn" onClick={() => onDeleteItem(index)}>
                    Delete
                  </button>
                </figure>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
