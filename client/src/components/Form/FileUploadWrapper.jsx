import _ from "lodash";
import React from "react";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
} from "@material-ui/core";
import { useState } from "react";

const FileUploadWrapper = props => {
  const {
    name,
    label,
    onChange,
    multiple
  } = props;

  const [files, setFiles] =  useState([]);

  const handleFileRead = e => {
    const {
      result,
      fileName,
    } = e.target;

    const newFile = {name: fileName, content: btoa(result)};
    setFiles(files => {
      const newFiles = multiple ? [...files, newFile] : [newFile];
      onChange({target: {
        name: name, 
        value: newFiles,
      }});
      return newFiles;
    });
  }

  const _onChange = e => {
    const {
      files,
    } = e.target;

    _.range(files.length).forEach(index => {
      const currentFile = files[index];

      const fileReader = new FileReader();
      fileReader.fileName = currentFile.name;
      fileReader.onloadend = handleFileRead;
      fileReader.readAsBinaryString(currentFile);
    })
  }

  return  (
    <Grid container justify="center" direction="column">
      <Grid item container justify="center">
        <Button variant="outlined" component="label">
          {label}
          <input
            {...props}
            onChange={_onChange}
            type="file"
            name={name}
            style={{ display: "none" }}
          />
        </Button>
      </Grid>
      {
        files.length > 0
        ? <>
            <Box mt={2}/>
            <Grid item container justify="center">
              <Typography>
                {files.map(file => file.name).join(", ")}
              </Typography>
            </Grid>
          </>
        : <></>
      }
    </Grid>
  );
}

export default FileUploadWrapper;
