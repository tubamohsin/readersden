import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CloudUploadIcon from "@material-ui/icons/AddAPhoto";
import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FormatQuote from "@material-ui/icons/FormatQuote";

const useStyles = makeStyles(theme => ({
  appBar: {},
  card: {
    maxWidth: 500,
    maxHeight: "80vh",
    overflowY: "auto"
  },
  media: {
    height: 140
  },
  grid: {
    // padding: theme.spacing(2),
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden"
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  uploadButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  formField: {
    width: "300px"
  },
  container: {
    maxHeight: "90vh",
    padding: theme.spacing(1),
    overflowY: "auto"
  },
  cardTitle: {
    margin: theme.spacing(3)
  }
}));

export default function Form({
  title,
  setTitle,
  setQuotes,
  setQuotesM,
  askingPrice,
  setAskingPrice,
  description,
  setDescription,
  imageFileName,
  Image,
  setImage,
  imageIsUploading,
  quote,
  qoutes
}) {
  // qoutes = [];
//  const [qoutes, setQoutes] = useState([]);

  const classes = useStyles();
  // const setQuotes = e => {
  //   if (e.key == "Enter") {
  //     setQoutes([...qoutes, e.target.value]);
  //     // qoutes.push(e.target.value);
  //     e.target.value = "";
  //     console.log('form',qoutes);
  //   }
  // };
  return (
    <Grid container direction="column" justify="flex-start" alignItems="center">
      <TextField
        required
        label="Title"
        placeholder="Power of Habit"
        margin="normal"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className={classes.formField}
        variant="filled"
      />

      <TextField
      required
        id="standard-multiline-flexible"
        label="About"
        multiline
        margin="normal"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className={classes.formField}
        variant="filled"
      />

      <TextField
        required
        label="Quote"
        multiline
        margin="normal"
        value={qoutes}
        onChange={e => 
          setQuotes(e.target.value)}
        className={classes.formField}
        variant="filled"
      />

      <input
        accept=".png, .jpg, .jpeg"
        className={classes.input}
        id="contained-button-file"
        type="file"
        disabled={imageIsUploading}
        onChange={e => {
          const newImage = e.target.files[0];
          setImage(newImage);
        }}
      />
      <label htmlFor="contained-button-file" className={classes.uploadButton}>
        <Button
          variant="contained"
          component="span"
          className={`${classes.button} ${classes.formField}`}
          disabled={imageIsUploading}
        >
          {imageIsUploading
            ? "Uploading..."
            : imageFileName
            ? "Change image"
            : "Picture of your book"}
          <CloudUploadIcon
            style={{ color: "#455A64" }}
            className={classes.rightIcon}
          />
        </Button>
      </label>
      {imageFileName ? Image : ""}
    </Grid>
  );
}
