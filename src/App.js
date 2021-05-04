import { useEffect, useMemo, useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { UsersList } from './UsersList.js';
import { AddComment } from './AddComment.js';
import { CommentsList } from './CommentsList.js';
import { getPeople } from './api.js';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  }
}));

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
 
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      localStorage.setItem(key, JSON.stringify(valueToStore));
      setStoredValue(valueToStore);
    } catch (error) {
      console.warn(error);
    }
  };
  return [storedValue, setValue];
};

function App() {
  const [people, setPeople] = useState(null);
  const [isOpenCommentWindow, setIsOpenCommentWindow] = useState(false);
  const [isOpenCommenstWindow, setIsOpenCommenstWindow] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [comments, setComments] = useLocalStorage('comments', {});

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  const selectedUserName = useMemo(() => {
    if (selectedUserId === null) {
      return;
    }

    return people.find(person => person.created === selectedUserId).name;
  }, [people, selectedUserId]);

  const onOpenComment = (userId) => {
    setIsOpenCommentWindow(true);
    setSelectedUserId(userId);
  };

  const onOpenComments = (userId) => {
    setIsOpenCommenstWindow(true);
    setSelectedUserId(userId);
  };

  const saveComment = (comment) => {
    setComments(comments => ({
      ...comments,
      [selectedUserId]: [...comments[selectedUserId] || [], comment],
    })
  )};

  const classes = useStyles();

  if (people === null) {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    )
  } 

  return (
    <Container maxWidth="md">
      <UsersList 
        people={people} 
        addComment={onOpenComment}
        showComments={onOpenComments} 
      />
      <AddComment 
        isOpen={isOpenCommentWindow} 
        onClose={() => setIsOpenCommentWindow(false)} 
        onSave={saveComment}
      />
      <CommentsList 
        isOpen={isOpenCommenstWindow}
        onClose={() => setIsOpenCommenstWindow(false)} 
        comments={comments[selectedUserId]}
        selectedUserName={selectedUserName}
      /> 
    </Container>
  );
}

export default App;
