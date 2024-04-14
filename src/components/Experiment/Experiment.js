import React from 'react';
import { useParams } from 'react-router-dom';
import Status from '../Status';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { getExperimentById, updateExperimentStatus } from '../../requests';
import ExperimentDetails from './ExperimentDetails';
import ChangeStatusButton from '../ChangeStatusButton';

const Experiment = () => {
    const navigate = useNavigate();
    let { id } = useParams();

    const [experiment, setExperiment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getExperimentById(id)
            .then((data) => setExperiment(data))
            .catch((error) => {
                console.error('Failed to fetch experiment', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, loading]);

    if (loading && !experiment) {
        return <div>Loading...</div>;
    }

    const ChangeExperimentStatus = (status) => {
        setExperiment({ ...experiment, exp_status: status });
        updateExperimentStatus(experiment, status);
    };

    return experiment ? (
        <div className="min-h-screen w-full flex flex-col items-center bg-[#1c2c4c]">
            <button
                className="absolute top-5 left-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-12"
                onClick={() => navigate('/experiments')}>
                Back
            </button>
            <div className="flex flex-col shadow-sm rounded-xl p-4 bg-white mt-20 min-w-[600px] gap-4">
                <h1 className="font-bold text-gray-800 text-5xl">Experiment</h1>
                <Status status={experiment.exp_status} />
                <div className="flex flex-col w-full">
                    <ExperimentDetails experiment={experiment} />
                </div>
                <div className="flex justify-end">
                    <ChangeStatusButton
                        status={experiment.exp_status}
                        setStatus={ChangeExperimentStatus}
                    />
                </div>
            </div>
        </div>
    ) : (
        <div>Experiment not found</div>
    );
};
export default Experiment;
