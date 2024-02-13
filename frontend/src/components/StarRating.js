import React, { useEffect, useState } from 'react';
import { Rating, StickerStar } from '@smastrom/react-rating';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import {
  calculateAverageRatingPUT,
  calculateAverageRatingPOST,
} from '../utils/dataUtils';

const StarRating = ({ playlist, setPlaylist }) => {
  const [rating, setRating] = useState(0);
  console.log(playlist);

  useEffect(() => {
    const fetchRatingData = async () => {
      if (playlist.rating_id) {
        try {
          const { data } = await axiosRes.get(`ratings/${playlist.rating_id}`);
          setRating(data.score);
          console.log('rating data: ', data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchRatingData();
  }, [playlist]);

  const handleChange = async (selectedValue) => {
    if (playlist.rating_id) {
      try {
        await axiosReq.put(`ratings/${playlist.rating_id}`, {
          score: selectedValue,
        });

        setRating(selectedValue);
        setPlaylist((prevState) => ({
          ...prevState,
          average_rating: calculateAverageRatingPUT(
            prevState,
            rating,
            selectedValue
          ),
        }));
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axiosReq.post('ratings/', {
          playlist: playlist.id,
          score: selectedValue,
        });

        setRating(selectedValue);
        setPlaylist((prevState) => ({
          ...prevState,
          ratings_count: prevState.ratings_count + 1,
          average_rating: calculateAverageRatingPOST(prevState, selectedValue),
        }));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const myStyles = {
    itemShapes: StickerStar,
    activeFillColor: '#df604e',
    inactiveFillColor: '#df5f4e6e',
  };

  return (
    <>
      <Rating
        value={rating}
        onChange={handleChange}
        style={{ maxWidth: 250, margin: 'auto' }}
        itemStyles={myStyles}
        items={5}
      />
      {rating ? (
        <p>
          <em>Click to edit your rating</em>
        </p>
      ) : (
        <p>
          <em>Click to add your rating</em>
        </p>
      )}
    </>
  );
};

export default StarRating;
