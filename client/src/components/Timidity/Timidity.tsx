import { Button, Typography } from '@material-ui/core';
// @ts-ignore
import { Timidity } from 'timidity';
import React from 'react';
import { baseUrl } from '../../api.service';

// type Props = {
//     src: string,
//     fileName: string
// }

const TimidityPlayer: React.FC = () => {
    const player = new Timidity()

    const playMidiFile = () => {
        player.load('bach_bwv_858_predlude_z0.mid')
        player.play()
        player.on('playing', () => {
            console.log(player.duration)
        })
    }
    return (
        <div>
            <Button onClick={playMidiFile}>Play Midi File</Button>
        </div>
    )
}

export default TimidityPlayer