import { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
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

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export const AddComment = ({ isOpen, onClose, onSave }) => {
  const [open, setOpen] = useState(isOpen);
  const [comment, setComment] = useState('');

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    setComment('');
    onClose();
  };

  const handleOnChange = (event) => {
    setComment(event.target.value);
  }

  const handleOnSave = () => {
    setOpen(false);
    onSave(comment);
    setComment('');
    onClose();
  }

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle onClose={handleClose}>
          Add new comment
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <textarea
              rows="10" 
              cols="40" 
              value={comment}
              onChange={handleOnChange}
              required
            />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleOnSave} color="primary" disabled={!comment}>
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AddComment.propTypes = {
  isOpen: PropTypes.bool.isRequired, 
  onClose: PropTypes.func.isRequired, 
  onSave: PropTypes.func.isRequired, 
}
