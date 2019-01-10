import React from 'react';

import classNames from 'classnames';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { lighten } from '@material-ui/core/styles/colorManipulator';


/**
 * Props:
 * 
 * rows - an array of row data that defines what to show in the table. Example:
   const rows = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
    ];
 * 
 * data - an array of data to display.  Each item that should be displayed should be defined
 * in the 'rows' prop
 * 
 */

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class FilteredTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, cols } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {cols.map(col => {
            return (
              <TableCell
                key={col.id}
                numeric={col.numeric}
                padding={col.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === col.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={col.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === col.id}
                    direction={order}
                    onClick={this.createSortHandler(col.id)}
                  >
                    {col.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

FilteredTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let FilteredTableToolbar = props => {
  const { numSelected, classes, singletype, multitype } = props;

  let formattedPlaceholder = "Find " + singletype + " by name";

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} {singletype}(s) selected
          </Typography>
        ) : (
          <Input
            placeholder={formattedPlaceholder}
            onChange={props.onSearch}
            className={classes.input}
            inputProps={{
              'aria-label': 'Description',
            }}
          />
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Button size="small" variant="contained" color="secondary" className={classes.button}>
            Delete {multitype}
          </Button>
        ) : ""}
      </div>
    </Toolbar>
  );
};

FilteredTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

FilteredTableToolbar = withStyles(toolbarStyles)(FilteredTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class FilteredTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    filter: "",
    filteredSet: [],
    page: 0,
    rowsPerPage: 5,    
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: this.props.data.map(n => n.name) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  /* Try this for filtered data: https://stackoverflow.com/questions/45542488/material-ui-beta-table-with-global-search  */
  handleSearch = event => {
    const {data} = this.props;
    let filteredData = [];
    const regex = new RegExp(event.target.value, 'gi');

    //  Filter the dataset
    filteredData = data.filter(e => {
        let itemProps = Object.values(e);
        let found = false;

        //  For each property on the item... 
        itemProps.forEach(e => {            
            
            //  If the property is a string...
            if (typeof e == 'string')
            {
              //  ...  see if we can find a match                            
              let match = e.match(regex);

              //  If we have a match, indicate it
              if(match != null) {
                found = true;
              }
            }                
        })
        
        //  If we found it in one of the properties, return the item 
        //  the property was a part of.  Otherwise, return null
        if (found) {
          return e;
        } else {
          return null;
        }
    })

    /*
    //  Log what we found (diagnostics)
    let logdata = {};
    logdata.data = data;
    logdata.filterdata = filteredData;
    logdata.filter = event.target.value;

    console.log(logdata);
    */

    //  Update our state to include the filtered set and our search text
    this.setState({filteredSet: filteredData, filter: event.target.value})
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, cols, data, singletype, multitype } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);    

    return (
      <Paper className={classes.root}>
        <FilteredTableToolbar onSearch={this.handleSearch} numSelected={selected.length} singletype={singletype} multitype={multitype} />
        <div className={classes.tableWrapper}>
          
          <Table className={classes.table} aria-labelledby="tableTitle">
            <FilteredTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              cols={cols}
            />

            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.name);                  

                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.name)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.name}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>

                      {                        
                        //  Cycle through each column and emit the data value if it matches the column name
                        cols.map(c => {

                          //  Special handling for the "name" column
                          if(c.id === "name") {
                            return (
                              <TableCell component="th" scope="row" padding="none">
                                {n.name}
                              </TableCell>
                            );
                          }
                          else 
                          {
                            return(
                              <TableCell>{n[c.id]}</TableCell>
                            );
                          }
                        })                    
                      }
                      
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={cols.length + 1} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />

      </Paper>
    );
  }
}

FilteredTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilteredTable);