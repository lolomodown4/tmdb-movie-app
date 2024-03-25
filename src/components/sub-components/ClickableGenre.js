import { useState } from "react";

const Clickable = ({ genre, genresChecked, setGenresChecked }) => {
  const [isClicked, setIsClicked] = useState(false);

  /* gawing global */

  const handleClick = (genre) => {
    setIsClicked(!isClicked);

    /* kasi hindi pa nadedetect yung pagbabago kaya !isClicked ginamit */
    if (!isClicked) {
      setGenresChecked((prev) => {
        return [...prev, { id: genre.id, name: genre.name }];
      });
    } else {
      setGenresChecked((prev) =>
        prev.filter((each) => each.name !== genre.name)
      );
    }
  };

  return (
    <div
      className={isClicked ? "genres-button-clicked" : "genres-button"}
      key={genre.id}
      onClick={() => handleClick(genre)}
    >
      {genre.name}
    </div>
  );
};

export default Clickable;
