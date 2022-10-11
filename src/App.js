import { useState, useEffect } from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [data, setData] = useState([]);
  const [val, setVal] = useState("");
  const [msg, setMsg] = useState("");
  const [view, setView] = useState([]);

  useEffect(() => {
    let arr = [];
    fetch("https://reqres.in/api/users").then((response) => {
      response.json().then((td) => {
        arr.push(...td.data);
        fetch("https://reqres.in/api/users/?page=2").then((response) => {
          response.json().then((td) => {
            arr.push(...td.data);
            setData(arr);
            // console.log(td.data);
          });
        });
        console.log(td.data);
      });
    });
  }, []);

  function givenValue(event) {
    setVal(event.target.value);
  }

  function onclicking() {
    let v = val * 1;
    if (!isNaN(v) && v > 0 && v < 13) {
      card(v);
    } else {
      setMsg("invalid input");
      setTimeout(() => {
        setMsg("");
      }, 2000);
    }
    setVal("");
  }

  function onListClick(id) {
    card(id);
  }

  const list = data.map((el) => {
    return (
      <li
        className="list-container"
        onClick={() => {
          onListClick(el.id);
        }}
      >
        {el.first_name}
      </li>
    );
  });

  const list2 = view.map((el) => {
    return (
      <div>
        <img
          className="image-container"
          src={el.avatar}
          alt="Girl in a jacket"
        />
        <h4>{el.first_name + " " + el.last_name}</h4>
        <h6>Id No. -{el.id}</h6>
        <h6>Email: {el.email}</h6>
        <hr className="line" />

        <p>
          Hello, I am <i>"{el.first_name + " " + el.last_name}"</i> I am working
          as a software engineer. I enjoy with my work and I always do my work
          on time. Software engineering is the branch of computer science that
          deals with the design, development, testing, and maintenance of
          software applications. Software engineers apply engineering principles
          and knowledge of programming languages to build software solutions for
          end users. Choosing a career as a software engineer gives you
          opportunities to work in many different industries and fields, as
          nearly all businesses use software. Whether you enjoy finances,
          entertainment, sports, real estate, or some other industry, there’s a
          good chance there are jobs for software engineers.
        </p>
      </div>
    );
  });

  const card = (id) => {
    let ary = data.filter((el) => {
      if (el.id === id) {
        return true;
      }
      return false;
    });
    setView(ary);
  };

  return (
    <div className="App">
      <div className="section1">
        <h5>Access profile by name</h5>
        <div className="in-sec1">
          <ul>{list}</ul>
        </div>
        {/* <div className="box"></div> */}
      </div>

      <div className="section2">
        <h1>Employee's Profile</h1>
        <h2>Access Employee's profile Using id and name</h2>

        <h5 className="red">{msg}</h5>
        <input
          value={val}
          onChange={givenValue}
          type="text"
          placeholder="Enter user id (1-12)"
        />

        <button onClick={onclicking} className="btn btn-outline-secondary">
          Search
        </button>
        {/* <h3>the val {val}</h3> */}

        <div className="in-sec2">
          <div className="in-sec3">{list2}</div>
        </div>
      </div>
    </div>
  );
}
