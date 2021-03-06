//React
import React, { useContext } from "react";

//Styles & AOS animation
import { BoxImg, ParagraphTop, Paragraphs } from "../../styles/Index.styles";

//Contexto
import { PrincipalContext } from "../../context/PrincipalContext";
import { BoxReviews } from "./styles/ItemsReviews.style";

//Images
import startOn from "../../../public/images/star-on.svg";
import startOff from "../../../public/images/star-off.svg";
import imgProfile from "../../../public/images/default-profile.png";

//Functional & Services
import { deleteReviews } from "../../services/reviewsServices";
import { getYearsOld } from "../../lib/commonFunctional";

const ReviewsBoxItem = ({ review }) => {
  const {
    user,
    setMessageError,
    changeListReviews,
    setchangeListReviews,
  } = useContext(PrincipalContext);

  const deleteThisReview = async (e, value) => {
    e.preventDefault();
    const responseServerDelete = await deleteReviews({ _id: value });
    setchangeListReviews(!changeListReviews);
    setMessageError(responseServerDelete.message);
    setTimeout(() => {
      setMessageError(null);
    }, 5000);
  };

  return (
    <BoxReviews data-aos="fade-up">
      <ParagraphTop blue className="title">
        <span>{review.title}</span>
      </ParagraphTop>
      <Paragraphs className="message" blue>
        {review.message}
      </Paragraphs>
      <div className="box-reviews-user">
        <BoxImg className="box-user-image">
          <img
            src={review.creatorUserid.image || imgProfile}
            title={review.creatorUserid.name}
            alt={review.creatorUserid.name}
          />
        </BoxImg>
        <div className="box-user-item">
          <div className="box-top-user">
            <ParagraphTop blue>
              <span>
                {" "}
                {review.creatorUserid.name}{" "}
                {review.creatorUserid.lastname.slice(0, 1)}.
              </span>{" "}
              - {getYearsOld(review.creatorUserid.birthYear)} años
            </ParagraphTop>
          </div>
          <div className="starts">
            <img src={review.stars >= 1 ? startOn : startOff} />
            <img src={review.stars >= 2 ? startOn : startOff} />
            <img src={review.stars >= 3 ? startOn : startOff} />
            <img src={review.stars >= 4 ? startOn : startOff} />
            <img src={review.stars >= 5 ? startOn : startOff} />
          </div>
        </div>
      </div>
      {(user?.rol === "Admin" || user?._id === review.creatorUserid?._id) && (
        <button
          className="delete"
          value={review._id}
          onClick={(e) => deleteThisReview(e, e.target.value)}
        >
          Borrar
        </button>
      )}
    </BoxReviews>
  );
};
export default ReviewsBoxItem;
