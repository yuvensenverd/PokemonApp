import StarRatings from "react-star-ratings";
const limit = 160;
const numberOfStars = 8;

const StatRating = ({ stat }) => {
    // console.log(stat)
    return stat.map((val, id) => {
        return (
            <div className="d-flex flex-row align-items-center mb-2" key={id}>
                <h5 className="m-0 mr-2 ">{val.stat.name}</h5>
                <StarRatings
                    rating={(val.base_stat / limit) * 8}
                    starDimension="15px"
                    starSpacing="2px"
                    starRatedColor="#ffa533"
                    numberOfStars={numberOfStars}
                />
            </div>
        );
    });
};

export default StatRating;
