import React, { useEffect, useState} from 'react';
import './comments.css';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import Axios from 'axios';
import { apiDomain } from '../utils/utils';
import { comments } from './dataComments';
import io from 'socket.io-client';
import { useContext } from 'react';
import { Context } from './context/userContext/context';
import { appContext } from '../App';

const socket = io.connect("http://localhost:8089")


function Comments() {
  const {room, setRoom} = useContext(appContext);
  const [names, setNames] = useState('');
  const [filteredComments, setFilteredComments] = useState([]);
  const [thumbsUp, setThumbsUp] = useState(0);
  const [dbComments, setDbComments] = useState([]);
  const [colorUser, setColorUser] = useState('');
  const [receivedComments, setReceivedComments] = useState([]);
  const [thumbsUpCounts, setThumbsUpCounts] = useState([]);

const{user}=useContext(Context);
console.log(room);
console.log(user.username);

  // fetch comments from DB by teams/room

  const getComments = async () => {
  if( room !== ''){
    try {
      const results = await Axios.get(`${apiDomain}/comments/team/${room}`);
      setDbComments(results.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('An error occurred while processing the request.');
      }
    }
  }
  };

  useEffect(() => {
    getComments();
  }, []);


  // picking unique string from array of objects
  function pickUniqueString(arr) {
    const uniqueString = [];
    const seenString = new Set();

    for (const element of arr) {
      if (!seenString.has(element.name)) {
        uniqueString.push(element.name);
        seenString.add(element.name);
      }
    }
    return uniqueString;
  }

  const uniqueString = pickUniqueString(dbComments);

  useEffect(() => {
    // Initialize thumbs up counts when dbComments changes
    const counts = dbComments.map(() => 0);
    setThumbsUpCounts(counts);
  }, [dbComments]);


  // thumbs up and thumbs down votes
  const incrementor = (commentIndex) => {
    setThumbsUpCounts((prevCounts) => {
      const newCounts = [...prevCounts];
      newCounts[commentIndex] += 1;
      return newCounts;
    });
  };


  const schema = yup.object().shape({
    comment: yup.string().required('Comment is required'),
    name: yup.string().required('Name is required'),
    team: yup.string().required('Team is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const createComment = async (data) => {
    try {
      const res = await Axios.post(`${apiDomain}/comments`, data);
      console.log(res.data);
      setDbComments([...dbComments, data]);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('An error occurred while processing the request.');
      }
    }
  };
  // join room
  const joinRoom = () => {
    if (room !==''){
      socket.emit('join_room', room);
    }
  };

  useEffect(() => { 
    joinRoom();
  }, [room]);
console.log(room);

  // sending comments
  const onSubmit = (data) => {
    console.log(data);
    // setRowInput(data);
    // setComments([...comments, data]);
    socket.emit('comment', {data, room});
    // create a new comment
    createComment(data);
    setColorUser(data.name);

  
    reset();
  };

  // console.log(colorUser);
  // receiving comments
  useEffect(() => {
    {
      socket.on('receive_comment', (data) => {
        console.log(data.data);
        // setDbComments(data.data);
      }
      )

    }},[socket]);

  


  const filterComments = () => {
    const filtered = dbComments.filter((comment) => comment.name === names);
    setFilteredComments(filtered);
  };
  console.log(colorUser);

  useEffect(() => {
    if (names !== '') {
      filterComments();
    } else {
      setFilteredComments(dbComments);
    }
  }, [names, dbComments]);


  return (
    <>
      <div className="comments">
        <div className="comments_left_section">
          <h4>contributors</h4>
          <p onClick={() => setNames('')} className={`btn ${names === '' ? 'active' : ''}`}>
            All
          </p>
          {uniqueString.map((contributor, index) => (
            <p
              className={`btn ${contributor === names ? 'active' : ''}`}
              key={index}
              onClick={() => setNames(contributor)}
            >
              {user.username == contributor ? 'you' : contributor}
            </p>
          ))}
        </div>

        <div className="comments_right_section">
          <div className="base_color">
            <div className={`comment_display `}>
              {filteredComments.map((comment, index) => (
                <div className='accessor' key={index}>
                  <p style={{ backgroundColor: user.username === colorUser ? 'green' : '' }}>
                    {comment.comment}
                    <p>
                      <button className="btn" onClick={() => incrementor(index)}>
                        <FaThumbsUp />
                        {thumbsUpCounts[index]}
                      </button>
                      <span className="comment_by" style={{ color: 'orange' }}>
                        <b>by {user.username == comment.name ? 'you' : comment.name}</b>
                      </span>
                    </p>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <form action="" className="comments_form" onSubmit={handleSubmit(onSubmit)}>
              <input type="text" {...register('comment')} placeholder="Share your comment here..." />
              <input type="submit" className="btn" />
              <input type="text" {...register('name')} value={user.username} style={{ display: "none" }} />
              <input type="text" {...register('team')} value={user.team} style={{ display: "none" }} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}



export default Comments;
