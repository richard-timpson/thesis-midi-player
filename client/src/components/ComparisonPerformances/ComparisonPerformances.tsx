import React, { useCallback, useEffect, useState } from 'react';

import 'html-midi-player';
import { baseUrl, ComparisonMidiFilesResponse, getComparisonMidiFiles } from '../../api.service';
import { CircularProgress, Typography } from '@material-ui/core';

import styles from './ComparisonPerformances.module.scss';
import MidiFile from '../MidiFile/MidiFile';
import ComparisonPerformance from '../ComparisonPerformance/ComparisonPerformance';


const ComparisonPerformances: React.FC = () => {
    const [isLoadingComparisonPers, setIsLoadingComparisonPerfs] = useState(true);
    const [comparisonPerfs, setComparisonPerfs] = useState<ComparisonMidiFilesResponse | null>(null);
    const [comparisonPerfsError, setComparisonPerfsError] = useState(false);

    const getMidiFiles = useCallback(async () => {
        const rep = await getComparisonMidiFiles()
        if (rep.error) {
            setComparisonPerfsError(true)
        }
        else {
            setComparisonPerfs(rep.data)
        }
        setIsLoadingComparisonPerfs(false);

    }, [setComparisonPerfsError, setComparisonPerfs])

    const comparisonPerfsTemplate = () => {
        const perfs = []
        if (comparisonPerfs) {
            for (const [key, value] of Object.entries(comparisonPerfs)) {
                perfs.push(<ComparisonPerformance songName={key} perfNames={value} />)
            }
            return (
                <div className={styles.comparisonPerfs}>
                    {perfs}
                </div>
            )
        }
        else {
            return <></>
        }
    }

    useEffect(() => {
        if (isLoadingComparisonPers) {
            getMidiFiles();
        }
    }, [isLoadingComparisonPers, getMidiFiles])


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Typography variant='h5'>
                    Here are comparison performances for 3 compositions.
                    They contain both a score version of the midi name midi_cleaned.mid, as well as
                    other midi files of that are part of the Yamaha e-piano competition dataset by real
                    performers.
                </Typography>
            </div>
            {isLoadingComparisonPers &&
                <div className={styles.loading}>
                    <Typography variant="h6">
                        Loading Comparison Performances
                    </Typography>
                    <CircularProgress className={styles.progressBar} />
                </div>
            }
            {!isLoadingComparisonPers && !comparisonPerfsError && comparisonPerfs &&
                comparisonPerfsTemplate()
            }
            {!isLoadingComparisonPers && comparisonPerfsError &&
                <Typography variant="body1" color="error">
                    Error loading the comparison performances
                </Typography>
            }
        </div>
    );
}

export default ComparisonPerformances