import React, { useEffect, useState } from 'react';
import './comments.css';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { comments } from './dataComments';

function Comments() {
  const [names, setNames] = useState('');
  const [filteredComments, setFilteredComments] = useState([]);

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

  useEffect(() => {
   if(names !== ''){
    console.log(names);
    filterComments();
   }
   else{
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
          {comments.map((contributor, index) => (
            <p
              className={`btn ${contributor.by === names ? 'active' : ''}`}
              key={index}
              onClick={() => setNames(contributor.by)}
            >
              {contributor.by}
            </p>
          ))}
        </div>

        <div className="comments_right_section">
          <div className="base_color">
            <div className="comment_display">
              {filteredComments.map((comment, index) => (
                <React.Fragment key={index}>
                  <p>{comment.comment}</p>
                  <div className="comment_vote">
                    <p>
                      <FaThumbsUp />12
                    </p>
                    <p>
                      <FaThumbsDown />52
                    </p>
                    <p>{comment.by}</p>
                  </div>
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
