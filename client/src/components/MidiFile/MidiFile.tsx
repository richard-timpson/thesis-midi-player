import { Typography } from '@material-ui/core';
import React from 'react';
import { baseUrl } from '../../api.service';

type Props = {
    src: string,
    fileName: string
}

const MidiFile: React.FC<Props> = (props) => {
    return (
        <div>
            <Typography variant='body1'>
                {props.fileName}
            </Typography>
            {/* @ts-ignore */}
            <midi-player src={props.src} sound-font="https://storage.googleapis.com/magentadata/js/soundfonts/salamander"></midi-player>
            {/* <midi-player src={props.src} sound-font="https://storage.googleapis.com/magentadata/js/soundfonts/salamander" visualizer={`#${visualizerId}`}></midi-player> */}
            {/* @ts-ignore */}
            {/* <midi-visualizer src={midiSrc} type="piano-roll" id={visualizerId}></midi-visualizer> */}
        </div>
    )
}

// type FileListProps = {
//     midiFiles: Array<string>
// }

// const MidiFileList: React.FC<FileListProps> = (props) => {
//     const midiFileList = () => {
//         return props.midiFiles.map((file) => {
//             const midiSrc = `${baseUrl}/experiments/${expId}/${file}`;
//             return (
//                 <div className={styles.midiItem}>
//                     <MidiFile src={midiSrc} fileName={file} />
//                 </div>
//             )
//         })
//     }

//     return (
//         <div>
//             {midiFileList()}
//         </div>

//     )
// }

export default MidiFile