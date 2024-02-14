import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Rating, StickerStar } from '@smastrom/react-rating';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import {
  calculateAverageRatingPUT,
  calculateAverageRatingPOST,
} from '../utils/dataUtils';

const StarRating = ({ playlist, setPlaylist }) => {
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchRatingData = async () => {
      if (playlist.rating_id) {
        try {
          const { data } = await axiosRes.get(`ratings/${playlist.rating_id}`);
          setRating(data.score);
        } catch (err) {
          setErrors({
            message: 'Error fetching rating data',
          });
        }
        setShowAlert(true);
      }
    };
    fetchRatingData();
  }, [playlist]);

  const handleChange = async (selectedValue) => {
    // Clear any previous errors
    setErrors({});

    // If the user clicks the same rating, do nothing
    // Clicking the same rating defaults selectedValue = 0
    if (selectedValue === 0) {
      return;
    }

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
          // If the user is the owner of the playlist, update owner_rating state
          ...(playlist.is_owner ? { owner_rating: selectedValue } : {}),
        }));
      } catch (err) {
        setErrors({
          message: 'Error updating rating, please try again.',
        });
        setShowAlert(true);
      }
    } else {
      try {
        const { data } = await axiosReq.post('ratings/', {
          playlist: playlist.id,
          score: selectedValue,
        });

        setRating(selectedValue);
        setPlaylist((prevState) => ({
          ...prevState,
          rating_id: data.id,
          ratings_count: prevState.ratings_count + 1,
          average_rating: calculateAverageRatingPOST(prevState, selectedValue),
          // If the user is the owner of the playlist, update owner_rating state
          ...(playlist.is_owner ? { owner_rating: selectedValue } : {}),
        }));
      } catch (err) {
        setErrors({
          message: 'Error adding rating, please try again.',
        });
        setShowAlert(true);
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
      <p style={{ marginBottom: '0' }}>
        <em>Your rating:</em>
      </p>
      <Rating
        value={rating}
        onChange={handleChange}
        style={{ maxWidth: 250, margin: 'auto' }}
        itemStyles={myStyles}
        items={5}
      />

      {showAlert && errors?.message && (
        <Alert
          variant='warning'
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {errors.message}
        </Alert>
      )}

      {rating ? (
        <p style={{ fontSize: '0.9rem' }}>
          <em>(Click to edit your rating)</em>
        </p>
      ) : (
        <p style={{ fontSize: '0.9rem' }}>
          <em>(Click to add your rating)</em>
        </p>
      )}
    </>
  );
};

export default StarRating;
