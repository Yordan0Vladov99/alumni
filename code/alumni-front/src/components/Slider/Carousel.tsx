import React from "react";
import { useSnapCarousel } from "react-snap-carousel";
import "./Carousel.scss";
interface CarouselProps<T> {
  readonly items: T[];
  readonly renderItem: (
    props: CarouselRenderItemProps<T>
  ) => React.ReactElement<CarouselItemProps>;
}

interface CarouselRenderItemProps<T> {
  readonly item: T;
  readonly isSnapPoint: boolean;
}

export const Carousel = <T extends any>({
  items,
  renderItem,
}: CarouselProps<T>) => {
  const {
    scrollRef,
    pages,
    activePageIndex,
    prev,
    next,
    goTo,
    snapPointIndexes,
  } = useSnapCarousel();
  return (
    <div className="carousel">
      <ul className="scroll" ref={scrollRef}>
        {items.map((item, i) =>
          renderItem({
            item,
            isSnapPoint: snapPointIndexes.has(i),
          })
        )}
      </ul>
      <div className="controls" aria-hidden>
        <button
          className={`nextPrevButton ${
            activePageIndex === 0 ? "nextPrevButtonDisabled" : ""
          }`}
          onClick={() => prev()}
        >
          {String.fromCharCode(8592)}
        </button>
        {pages.map((_, i) => (
          <button
            key={i}
            className={`paginationButton ${
              activePageIndex === i ? "paginationButtonActive" : ""
            }`}
            onClick={() => goTo(i)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className={`nextPrevButton ${
            activePageIndex === pages.length - 1 ? "nextPrevButtonDisabled" : ""
          }`}
          onClick={() => next()}
        >
          {String.fromCharCode(8594)}
        </button>
      </div>
      <div className="pageIndicator">
        {activePageIndex + 1} / {pages.length}
      </div>
    </div>
  );
};

interface CarouselItemProps {
  readonly isSnapPoint: boolean;
  readonly children?: React.ReactNode;
}

export const CarouselItem = ({ isSnapPoint, children }: CarouselItemProps) => (
  <li className={`item ${isSnapPoint ? "itemSnapPoint" : ""}`}>{children}</li>
);
