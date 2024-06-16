import { useState, useEffect } from "react";
import "./styles/input.css";



const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photos, setPhotos] = useState(
    "https://www.solidbackgrounds.com/images/2048x1536/2048x1536-smoky-black-solid-color-background.jpg"
  );
  const [cnt, setcnt] = useState(1)

  useEffect(() => {
    fetch("https://meowfacts.herokuapp.com/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [cnt]);

  useEffect(() => {
    fetch(
      `https://api.unsplash.com/photos/random?query=cats&count=1&client_id=YhKe1Ia7SccmrRBA3Z4oD5FMUmuUGf5g8h6F1_ODHis`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0].urls.regular);
        setPhotos(`${data[0].urls.regular}`);
        // images.src = data[0].urls.regular;
      }).catch((error) => {
      //  setError(error);
      //  setLoading(false);
     });
  }, []);




  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const backgroundImageStyle = {
    backgroundImage: `url(${photos})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textAlign: "center"
  };

  return (
    <>
      <div style={backgroundImageStyle} className="flex flex-col gap-11">
        <h1 className="m-10 text-[50px] font-serif bg-black opacity-60 p-3 px-7 rounded-2xl">Cat Facts</h1>
        <div className="w-100 bg-gray-50 p-5 px-7 rounded-2xl text-2xl font-serif opacity-60 shadow-lg text-orange-600">
          <ul className="">
            <li className="">{data}</li>
          </ul>
        </div>
          <button onClick={() => {setcnt(cnt + 1);}
          } className="btn m-5 font-serif" >Next</button>
          <div className="font-serif text-lg  bg-teal-500 opacity-60 p-3 px-7 rounded-2xl">No.of Facts viewed this session: {cnt}</div>
      </div>

    </>
  );
};

export default App;
