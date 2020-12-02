import React, { useState } from 'react';

import 'html-midi-player';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './ExperimentPerformances.module.scss'
import { Button } from '@material-ui/core';
import { baseUrl, getExperimentMidiFiles } from '../../api.service';


const ExperimentPerformances:React.FC = () => {
  const [expId, setExpId] = useState('');
  const [loading, setLoading] = useState(false);
  const [requestedFiles, setRequestedFiles] = useState(false);
  const [showError, setShowError] = useState(false); 
  const [midiFiles, setMidiFiles] = useState<Array<string>>([]);
  const onExpIdChange = (e:React.ChangeEvent<HTMLInputElement>) => {
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
    return midiFiles.map((file) => {
      const midiSrc = `${baseUrl}/experiments/${expId}/${file}`;
      const visualizerId = `${file}_visualizer`
      return (
        <div className={styles.midiItem}>
          <Typography variant='body1'>
            {file}
          </Typography>
          {/* @ts-ignore */}
          <midi-player src={midiSrc} sound-font="https://storage.googleapis.com/magentadata/js/soundfonts/salamander" visualizer={`#${visualizerId}`}></midi-player>
          {/* @ts-ignore */}
          {/* <midi-visualizer src={midiSrc} type="piano-roll" id={visualizerId}></midi-visualizer> */}
        </div>
      )
    })
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
          <CircularProgress className={styles.progressBar}/>
        </div>
      }

      {!loading && requestedFiles &&
        midiFileList()
      }

      <div className={styles.fileList}>

      </div>
    </div>
  );
}

export default ExperimentPerformances;
