import { useState, useEffect }from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(3),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export const CommentsList = ({ 
  isOpen, 
  onClose, 
  comments, 
  selectedUserName 
}) => {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="xs" fullWidth={true}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        All comments 
        ({selectedUserName})
      </DialogTitle>
      <DialogContent dividers>
        {comments && comments.map((comment, id) => (
          <Typography gutterBottom key={id + 1}>
            {comment}
          </Typography>
        ))}
        {!comments && (
          <Typography>
            No comments yet...
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}

CommentsList.defaultProps = {
  comments: null,
  selectedUserName: null,
}

CommentsList.propTypes = {
  isOpen: PropTypes.bool.isRequired, 
  onClose: PropTypes.func.isRequired, 
  comments: PropTypes.arrayOf(PropTypes.string),
  selectedUserName: PropTypes.string, 
}
