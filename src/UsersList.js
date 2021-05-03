import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MessageIcon from '@material-ui/icons/Message';

import { withStyles, makeStyles } from '@material-ui/core/styles';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles(() => ({
  root: {
    '&:hover': {
      cursor: 'pointer',
    }
  }
}));

const headers = [
  {name: 'Name'},
  {name: 'BirthDay'},
  {name: 'Actions', options: {align: 'right'}}
];

export const UsersList = ({ people, addComment, showComments }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="people table">
        <TableHead>
          <TableRow>
            {headers.map(header => (
              <StyledTableCell key={header.name} {...header.options || {}}>
                {header.name}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {people.map((person) => (
            <StyledTableRow key={person.name}>
              <StyledTableCell>
                {person.name}
              </StyledTableCell>
              <StyledTableCell>
                {person.birth_year}
              </StyledTableCell>
              <StyledTableCell align="right">
                <VisibilityIcon 
                  className={classes.root} 
                  titleAccess="Show all comments" 
                  onClick={() => showComments(person.created)}
                />
                <MessageIcon 
                  className={classes.root} 
                  style={{marginLeft: '15px'}} 
                  titleAccess="Add new comment"
                  onClick={() => addComment(person.created)}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

UsersList.propTypes = {
  addComment: PropTypes.func.isRequired,
  showComments: PropTypes.func.isRequired, 
  people: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      birth_year: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
    })
  ),
}
