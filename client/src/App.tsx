import React, { useState }  from 'react';

import 'html-midi-player';
import styles from './App.module.scss'
import { Button, Typography } from '@material-ui/core';
import ExperimentPerformances from './components/ExperimentPerformances/ExperimentPerformances';


function App() {
  const [numExperiments, setNumExperiments] = useState(1);

  const experiments = () => {
    const exps = []
    for (let i = 0; i < numExperiments; i++) {
      exps.push(<ExperimentPerformances />)
    }
    return exps
  }

  const addExperiment = () => {
    setNumExperiments(numExperiments + 1);
  }

  const removeExperiment = () => {
    if (numExperiments > 0)
      setNumExperiments(numExperiments - 1);
  }

  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <Typography variant="h4">
          Click the buttons below to add or remove an experiment
        </Typography>
        <div className={styles.buttons}>
          <Button variant='contained' onClick={addExperiment} color="primary">
            Add Experiment
          </Button>
          <Button variant='contained' onClick={removeExperiment} color="primary">
            Remove Experiment
          </Button>
        </div>
        <div className={styles.performances}>
          {experiments()}
        </div>
      </div>
    </div>
  );
}

export default App;
