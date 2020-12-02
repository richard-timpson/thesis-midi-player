from neptune.sessions import Session
from neptune.experiments import Experiment
from keys import NEPTUNE_TOKEN

def get_experiment_by_id(id:str) -> Experiment:
    session = Session.with_default_backend(NEPTUNE_TOKEN)
    project = session.get_project('richt3211/thesis')

    exp:Experiment = project.get_experiments(id)[0]
    
    return exp