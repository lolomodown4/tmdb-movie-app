const TitleCard = ({ data, showModal, isMovie = false }) => {
  return data.results.map((each) => {
    return (
      <div key={each.id} className="title-card" onClick={() => showModal(each)}>
        <div className="vote-average">
          {Math.round(each.vote_average * 10) / 10}
        </div>
        <div className="poster-container">
          <img
            src={`https://image.tmdb.org/t/p/w300/${each.poster_path}`}
            alt="no poster available"
          />
        </div>
        <div className="extra-details">
          <h2 className="title">{each.title || each.name}</h2>
          <div className="media-type_and_first-date">
            {isMovie ? <h3>Movie</h3> : <h3>{each.media_type}</h3>}
            <h3>{each.first_air_date || each.release_date}</h3>
          </div>
        </div>
      </div>
    );
  });
};

export default TitleCard;
