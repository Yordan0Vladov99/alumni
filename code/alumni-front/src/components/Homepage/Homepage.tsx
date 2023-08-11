import { useEffect, useState } from "react";
import Slider from "../Slider/Slider";
import "./Homepage.scss";
import { Link } from "react-router-dom";
const HomePage = () => {
  const [selectedGroups, setSelectedGroups] = useState<GroupLink[] | undefined>(
    undefined
  );

  const fetchData = async () => {
    await fetch("/api/groups/getSelectedGroups", {
      headers: {
        "Content-Type": "application/json",

        Accept: "application/json",
      },
    })
      .then((data) => data.json())
      .then((data: GroupLink[]) => {
        setSelectedGroups(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App-Body">
      <Slider />
      <div className="description">
        <div className="description-content">
          <h1>Memories that last forever</h1>

          <p>
            Welcome to Alumni, the premier destination for preserving and
            sharing your most treasured memories through the art of photography.
            Our intuitive photo website provides a seamless platform for users
            to showcase their creativity and connect with a vibrant community of
            like-minded individuals. Whether you're an amateur photographer or a
            seasoned pro, Alumni is your digital haven to upload and curate your
            own captivating images.
          </p>

          <p>
            But we don't stop at digital storage. With Alumni, you can transform
            your favorite photos into tangible keepsakes that will forever
            encapsulate the essence of those cherished moments. From
            personalized cups to stylish t-shirts, and elegantly framed prints,
            our wide array of customizable items allows you to turn your
            photographs into beautiful, tangible pieces of art. Not only that,
            but Alumni goes beyond just preserving memories - it helps you
            create new ones.
          </p>

          <p>
            Our innovative scheduling feature makes it effortless to book
            professional photo sessions, ensuring you capture life's most
            precious milestones with precision and artistry. Join us on Alumni,
            where the power of photography comes to life, and every pixel tells
            a unique story.
          </p>
        </div>
        <div className="img-container">
          <img
            src="/images/yordan_vladov.jpg"
            alt="Yordan Vladov"
            className="author-img"
          />
        </div>
      </div>
      <div className="features-section">
        <h1>What we offer</h1>
        <div className="features">
          <div className="feature">
            <img src="/images/photo.svg" alt="image" />
            <h2>Upload your own photos</h2>
          </div>

          <div className="feature">
            <img src="/images/cart.svg" alt="cart" />
            <h2>Order different items</h2>
          </div>

          <div className="feature">
            <img src="/images/group.svg" alt="group" />
            <h2>Organize photos in groups</h2>
          </div>

          <div className="feature">
            <img src="/images/calendar.svg" alt="calendar" />
            <h2>Schedule photo sessions</h2>
          </div>

          <div className="feature">
            <img src="/images/share.svg" alt="share" />

            <h2>View others' memories</h2>
          </div>

          <div className="feature">
            <img src="/images/camera.svg" alt="camera" />
            <h2>Post your own work</h2>
          </div>
        </div>
      </div>
      <div className="groups-section">
        <h1>Selected Groups</h1>
        <div className="groups">
          <>
            {selectedGroups ? (
              selectedGroups.map((groupLink) => (
                <Link to={`/group/${groupLink.id}`}>
                  <div key={groupLink.id} className="group">
                    <img src={`/api/uploads/${groupLink.imgSrc}`} alt="" />
                    <h2>{groupLink.name}</h2>
                  </div>
                </Link>
              ))
            ) : (
              <div>There are currently no Selected Groups.</div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
