import { Button, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { baseUrl, ComparisonMidiFilesResponse } from '../../api.service';
import MidiFile from '../MidiFile/MidiFile';
import styles from './ComparisonPerformance.module.scss';

type Props = {
    songName: string, 
    perfNames: Array<string>
}

const ComparisonPerformance:React.FC<Props> = (props) => {
    const [loadedPerfs, setLoadedPerfs] = useState(false);
    const [loadedHalf, setLoadedHalf] = useState(false);
    const [loadedRest, setLoadedRest] = useState(false);

    const isChopin = props.songName.includes('chopin')
    const comparisonPerfTemplate = () => {
        const perfs =  props.perfNames.map((item, index) => {
            const midiSrc = `${baseUrl}/experiments/comparison/${props.songName}/${item}`;
            return <MidiFile src={midiSrc} fileName={item} key={index} />
        })
        if ((isChopin && loadedRest) || !isChopin) {
            return perfs
        }
        else if (isChopin && loadedHalf) {
            return perfs.slice(0, perfs.length / 2)
        }
    }

    return (
        <div className={styles.container}>
            <Typography variant="h6">
                    {props.songName}
            </Typography>
            {!loadedPerfs && !isChopin  && 
                <Button variant="contained" onClick={() => setLoadedPerfs(true)}>
                    Load Performances
                </Button>
            } 
            {!loadedHalf && isChopin && 
                <Button variant="contained" onClick={() => setLoadedHalf(true)}>
                    Load Half of Performances
                </Button>
            } 
            {loadedHalf && !loadedRest && isChopin && 
                <Button variant="contained" onClick={() => setLoadedRest(true)}>
                    Load Rest of Performances
                </Button>
            } 
            {(loadedPerfs || loadedHalf || loadedRest) && 
                comparisonPerfTemplate()
            }
        </div>
    )
}

export default ComparisonPerformance