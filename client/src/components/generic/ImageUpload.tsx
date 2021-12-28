/* tslint:disable */
//@ts-nocheck
//Tabs
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Fab,
  Grid,
  IconButton,
  InputBase,
  Paper,
} from '@mui/material';
import React from 'react';
import { Search, AddPhotoAlternate, Close } from '@mui/icons-material';
import { withStyles } from '@mui/styles';

const styles = (theme: any) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  cardHeader: {
    textalign: 'center',
    align: 'center',
    backgroundColor: 'white',
  },
  input: {
    display: 'none',
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    align: 'center',
  },
  button: {
    color: theme.palette.primary.main,
  },
  secondaryButton: {
    color: 'gray',
    margin: 10,
  },
  typography: {
    margin: theme.spacing.unit * 2,
    backgroundColor: 'default',
  },

  searchRoot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
  },
  searchIconButton: {
    padding: 2,
  },
  searchDivider: {
    width: 1,
    height: 28,
    margin: 4,
  },
});

class ImageUploadCard extends React.Component {
  handleUploadClick = (event: any) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e: any) {
      this.props.setImageState({ ...this.props.imageState, selectedFile: [reader.result] });
    }.bind(this);

    this.props.setImageState({
      ...this.props.imageState,
      mainState: 'uploaded',
      selectedFile: event.target.files[0],
      imageUploaded: 1,
    });
    this.props.getTheImage(event.target.files[0]);
  };

  handleSearchClick = (event) => {
    this.props.setImageState({ ...this.props.imageState, mainState: 'search' });
  };

  renderInitialState() {
    const { classes }: any = this.props;

    return (
      <React.Fragment>
        <CardContent>
          <Grid container justify="center" alignItems="center">
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={this.handleUploadClick}
            />
            <label htmlFor="contained-button-file">
              <Fab component="span" className={classes.button}>
                <AddPhotoAlternate />
              </Fab>
            </label>
            {/* <Fab className={classes.button} onClick={this.handleSearchClick}>
              <Search />
            </Fab> */}
          </Grid>
        </CardContent>
      </React.Fragment>
    );
  }

  handleSearchURL = (event: any) => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e: any) {
      this.props.setImageState({ ...this.props.imageState, selectedFile: [reader.result] });
    }.bind(this);

    this.props.setImageState({
      ...this.props.imageState,
      selectedFile: event.target.files[0],
      imageUploaded: 1,
    });
  };

  handleImageSearch(url) {
    var filename = url.substring(url.lastIndexOf('/') + 1);
    this.props.setImageState({
      ...this.props.imageState,
      mainState: 'uploaded',
      imageUploaded: true,
      selectedFile: url,
      fileReader: undefined,
      filename: filename,
    });

    this.props.getTheImage(url);
  }

  handleSeachClose = (event) => {
    this.props.setImageState({ ...this.props.imageState, mainState: 'initial' });
  };

  renderSearchState() {
    const { classes } = this.props;

    return (
      <Paper className={classes.searchRoot} elevation={1}>
        <InputBase
          className={classes.searchInput}
          placeholder="Image URL"
          value={this.props.imageState.searchURL}
          onChange={(e) => {
            this.props.setImageState({ ...this.props.imageState, searchURL: e.target.value });
          }}
        />
        <IconButton
          className={classes.button}
          aria-label="Search"
          disabled={this.props.imageState.searchURL === ''}
          onClick={() => this.handleImageSearch(this.props.imageState.searchURL)}
        >
          <Search />
        </IconButton>
        <Divider className={classes.searchDivider} />
        <IconButton
          color="primary"
          className={classes.secondaryButton}
          aria-label="Close"
          onClick={this.handleSeachClose}
        >
          <Close />
        </IconButton>
      </Paper>
    );
  }

  handleAvatarClick(value) {
    var filename = value.url.substring(value.url.lastIndexOf('/') + 1);
    this.props.setImageState({
      ...this.props.imageState,
      mainState: 'uploaded',
      imageUploaded: true,
      selectedFile: value.url,
      fileReader: undefined,
      filename: filename,
    });
  }

  renderUploadedState() {
    // const { classes } = this.props;

    return (
      <React.Fragment>
        {/* <CardActionArea
          sx={{ maxWidth: "95%", maxHeight: "500px" }}
        >
          <img width="100%" style={{ objectFit: "contain" }} className={classes.media} />
        </CardActionArea> */}

        <CardMedia
          sx={{ margin: '0 auto', width: '100%', aspectRatio: '4/5' }}
          component="img"
          onClick={this.imageResetHandler}
          alt="broken"
          src={this.props.imageState.selectedFile ?? ''}
        />
      </React.Fragment>
    );
  }

  imageResetHandler = (event) => {
    this.props.setImageState({
      ...this.props.imageState,
      mainState: 'initial',
      selectedFile: null,
      imageUploaded: 0,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          {(this.props.imageState.mainState === 'initial' && this.renderInitialState()) ||
            (this.props.imageState.mainState === 'search' && this.renderSearchState()) ||
            (this.props.imageState.mainState === 'uploaded' && this.renderUploadedState())}
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ImageUploadCard);
