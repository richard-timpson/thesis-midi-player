import React, { useState } from 'react';

import 'html-midi-player';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './ExperimentPerformances.module.scss'
import { Button } from '@material-ui/core';
import { baseUrl, ExperimentMidiFilesResponse, getExperimentMidiFiles } from '../../api.service';
import MidiFile from '../MidiFile/MidiFile';


const ExperimentPerformances: React.FC = () => {
  const [expId, setExpId] = useState('');
  const [loading, setLoading] = useState(false);
  const [requestedFiles, setRequestedFiles] = useState(false);
  const [showError, setShowError] = useState(false);
  const [midiFiles, setMidiFiles] = useState<ExperimentMidiFilesResponse | null>(null);
  const onExpIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpId(e.target.value)
  }

  const onButtonClick = async () => {
    setLoading(true)
    setShowError(false);
    const rep = await getExperimentMidiFiles(expId);
    if (rep.error) {
      setShowError(true);
    }
    else {
      setMidiFiles(rep.data);
    }
    setLoading(false)
    setRequestedFiles(true);
  }

  const midiFileList = () => {
    if (midiFiles) {
      return midiFiles.map((file, index) => {
        const midiSrc = `${baseUrl}/experiments/${expId}/${file}`;
        return (
          <div className={styles.midiItem} key={index}>
            <MidiFile src={midiSrc} fileName={file} />
          </div>
        )
      })
    }
    else {
      return <></>
    }
  }

  return (
    <div className={styles.ExperimentPerformances}>
      <Typography variant="h6">
        Enter the id of the Neptune Experiment. It may take a while to download the performances.
      </Typography>
      <TextField className={styles.input} label="Experiment ID" variant="outlined" value={expId} onChange={onExpIdChange}></TextField>
      <Button className={styles.button} variant="contained" onClick={onButtonClick}>
        Get Experiment Performances
      </Button>

      {showError &&
        <Typography variant="body1" color="error">
          There was an error getting the midi files
        </Typography>
      }
      {loading &&
        <div className={styles.progress}>
          <CircularProgress className={styles.progressBar} />
        </div>
      }

      {!loading && requestedFiles &&
        midiFileList()
      }
    </div>
  );
}

export default ExperimentPerformances;
