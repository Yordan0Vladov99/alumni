import { useEffect, useState } from "react";
import { Carousel, CarouselItem } from "./Carousel";
import { CSSProperties } from "react";

const styles = {
  image: {
    height: "100%",
  },
  container: {
    width: "100%",
    height: "600px",
    margin: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
} satisfies Record<string, CSSProperties>;
type Photo = {
  fileName: number;
  fileExtension: string;
  userName: string;
  created: string;
};
const Slider = () => {
  const [photos, setPhotos] = useState<JSX.Element | undefined>(undefined);

  const fetchData = async () => {
    await fetch("/api/photos/getTopPhotos", {
      headers: {
        "Content-Type": "application/json",

        Accept: "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setPhotos(
          <Carousel
            items={data === undefined ? [] : (data as Photo[])}
            renderItem={({ item, isSnapPoint }) => (
              <CarouselItem key={item.fileName} isSnapPoint={isSnapPoint}>
                <div style={styles.container}>
                  <img
                    style={styles.image}
                    src={`/api/uploads/${item.fileName}.${item.fileExtension}`}
                    alt="Placeholder"
                  />
                </div>
              </CarouselItem>
            )}
          />
        );
        console.log(data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return photos || <div></div>;
};

export default Slider;
