import React, { useEffect, useState } from 'react';
import './comments.css';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { comments } from './dataComments';

function Comments() {
  let [names, setNames] = useState('');
  const [filteredComments, setFilteredComments] = useState([]);
  const [thumbsUp, setThumbsUp] = useState(0);


  // picking unique string from array of objects
  function pickUniqueString(arr) {
    const uniqueString = [];
    const seenString = new Set();

    for (const element of arr) {
      if (!seenString.has(element.by)) {
        uniqueString.push(element.by)
        seenString.add(element.by)
      }
    }
    return uniqueString;
  }

  const uniqueString = pickUniqueString(comments);
  console.log(uniqueString);

  // thumbs up and thumbs down votes
  const incrementor = () => {
    setThumbsUp(thumbsUp + 1);
  };


  const schema = yup.object().shape({
    comment: yup.string().required('Comment is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  // console.log(names);

  useEffect(() => {
    if (names !== '') {
      filterComments();
    }
    else {
      setFilteredComments(comments)
    }
  }, [names]);

  const filterComments = () => {
    const filtered = comments.filter((comment) => comment.by === names);
    setFilteredComments(filtered);
  };

  return (
    <>
      <div className="comments">
        <div className="comments_left_section">
          <h4>contributors</h4>
          <p onClick={() => setNames('')} className = {`btn ${names === '' ? 'active' : ''}`}>All</p>
          {uniqueString.map((contributor, index) => (
            <p
              className={`  btn ${contributor === names ? 'active' : ''}`}
              key={index}
              onClick={() => setNames(contributor)}
            >
              {contributor}
            </p>
          ))}
        </div>

        <div className="comments_right_section">
          <div className="base_color">
            <div className="comment_display">
              {filteredComments.map((comment, index) => (
                <React.Fragment key={index}>
                  <p>{comment.comment}
                  <p>
                  <button className = "btn" onClick={incrementor}>
                      <FaThumbsUp />{thumbsUp}
                    </button>
                    <button className = "btn">
                      <FaThumbsDown />52
                    </button>
                    <span className="comment_by"><b>by {comment.by}</b></span>
                  </p>
                  </p>
                 
                </React.Fragment>
              ))}
            </div>
          </div>

          <div>
            <form action="" className="comments_form" onSubmit={handleSubmit(onSubmit)}>
              <input type="text" {...register('comment')} placeholder="Share your comment here..." />
              <input type="submit" className="btn" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comments;
