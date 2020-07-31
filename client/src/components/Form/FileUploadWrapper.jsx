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
  IconButton,
} from "@material-ui/core";
import { useState } from "react";
import {
  DeleteOutline as DeleteOutlineIcon,
} from '@material-ui/icons';
import { useCallback } from "react";

const FileUploadWrapper = props => {
  const {
    name,
    label,
    onChange,
    multiple,
    onDeletePredefinedFile,
    enableDelete,
    allowEmptyFiles,
    value,
  } = props;

  const [files, setFiles] =  useState(_.isNil(value)
    ? []
    : multiple
      ? value.map((file, index) => ({name: file.filename, preDefined: true, ...value[index]}))
      : [{name: value.filename, preDefined: true, ...value}]
    );

  const wrapOnChange = newFiles => {
    onChange({target: {
      name: name, 
      value: newFiles,
    }});
  }

  const handleFileRead = e => {
    const {
      result,
      fileName,
    } = e.target;

    const newFile = {name: fileName, content: btoa(result)};
    setFiles(files => {
      const newFiles = multiple ? [...files, newFile] : [newFile];
      wrapOnChange(newFiles);
      return newFiles;
    });
  }

  const onDelete = index => {
    if (files[index].preDefined === true && !_.isNil(onDeletePredefinedFile)) {
      onDeletePredefinedFile(files[index]._id);
    }

    const newFiles = files.slice(0, index).concat(files.slice(index + 1))
    wrapOnChange(newFiles.filter(file => !file.preDefined));
    setFiles(newFiles);
  }

  const _onChange = useCallback(e => {
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
  }, []);

  return  (
    <Grid container justify="center" direction="column">
      <Grid item container justify="center">
        <Button variant="outlined" component="label">
          {label}
          <input
            {
              ..._.omit(props, ["value"])
            }
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
              {
                files.map((file, index) => 
                  <>
                    <Typography>
                      {file.name}
                    </Typography>
                    {
                      enableDelete
                      && (allowEmptyFiles || files.filter(file => !_.isNil(file.preDefined)).length > 1 || !file.preDefined)
                      ? <IconButton size="small" onClick={() => onDelete(index)}>
                          <DeleteOutlineIcon/>
                        </IconButton>
                      : <></>
                    }
                  </>
                 )
              }
            </Grid>
          </>
        : <></>
      }
    </Grid>
  );
}

export default FileUploadWrapper;
