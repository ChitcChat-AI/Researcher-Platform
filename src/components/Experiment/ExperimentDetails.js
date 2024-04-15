import React from 'react';
import ExperimentDetail from './ExperimentDetail';

const ExperimentDetails = ({ experiment }) => {
    return (
        <div className="grid grid-cols-2 w-full">
            <ExperimentDetail title="ID" value={experiment.exp_id} />
            <ExperimentDetail
                title="Created At"
                value={String(experiment.exp_created_at).split('T')[0]}
            />
            <ExperimentDetail title="Subject" value={experiment.exp_subject} />
            <ExperimentDetail
                title="Provoking Prompt"
                value={experiment.exp_provoking_prompt}
            />
        </div>
    );
};

export default ExperimentDetails;
