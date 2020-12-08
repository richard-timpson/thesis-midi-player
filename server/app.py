from flask import Flask, jsonify, send_file
from flask_cors import CORS
from neptune_service import get_experiment_by_id

import zipfile
import shutil
import os 

app = Flask(__name__, static_folder='../client/build', static_url_path='/')
CORS(app)

@app.route('/')
def hello():
    return app.send_static_file('index.html')

@app.route('/experiments/<exp_id>/<file>', methods=['GET'])
def get_experiment_midi_file(exp_id, file):
    if file[-4:] != '.mid':
        return "Not a valid midi file", 400

    return send_file(f'./artifacts/{exp_id}/{file}')

@app.route('/experiments/comparison/<song_name>/<file>', methods=['GET'])
def get_comparison_midi_file(song_name, file):
    if file[-4:] != '.mid':
        return "Not a valid midi file", 400

    return send_file(f'./artifacts/comparison/{song_name}/{file}')

@app.route('/experiments/comparison/', methods=['GET'])
def get_comparison_midi_files():
    exp = get_experiment_by_id('THESIS-99')
    artifact_folder = f'./artifacts/comparison'
    print('getting artifacts')
    if os.path.exists(artifact_folder):
        shutil.rmtree(artifact_folder)
        
    exp.download_artifacts(destination_dir=artifact_folder)
    get_artifacts_from_zip(artifact_folder)
    mid_files = get_comparison_midi_files(artifact_folder)

    return jsonify(mid_files)

@app.route('/experiments/<exp_id>', methods=['GET'])
def get_experiment_midi_files(exp_id:str):
    exp = get_experiment_by_id(exp_id)
    artifact_folder = f'./artifacts/{exp_id}'
    print('getting artifacts')
    if os.path.exists(artifact_folder):
        shutil.rmtree(artifact_folder)
        
    exp.download_artifacts(destination_dir=artifact_folder)
    get_artifacts_from_zip(artifact_folder)
    mid_files = get_midi_files_from_artifact(artifact_folder)

    return jsonify(mid_files)

def get_artifacts_from_zip(folder) -> None:
    with zipfile.ZipFile(f'{folder}/output.zip', 'r') as zip_ref:
        zip_ref.extractall(folder)
    
    source = f'{folder}/output/'
    destination = folder

    filenames = os.listdir(source)
    for file in filenames:
        shutil.move(os.path.join(source, file), destination)
        
    shutil.rmtree(source)
    os.remove(f'{folder}/output.zip')

def get_comparison_midi_files(folder):
    # first get the song names as all of the nested folders inside of the comparison folder
    song_names = []
    for x in os.listdir(folder):
        print(x)
        if os.path.isdir(os.path.join(folder, x)):
            song_names.append(x)
    print(song_names)
    ret = {}

    for song in song_names:
        midi_files = get_midi_files_from_artifact(f'{folder}/{song}')
        ret[song] = midi_files

    return ret

def get_midi_files_from_artifact(folder):
    mid_files = []
    for file in os.listdir(folder):
        if file.endswith('.mid'):
            mid_files.append(file)

    return mid_files

if __name__ == '__main__':
    app.run()