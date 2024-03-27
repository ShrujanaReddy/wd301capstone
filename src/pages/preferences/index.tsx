import React, { useEffect, useState } from 'react';
import { usePreferencesDispatch, usePreferencesState } from '../../context/preferences/context';
import { fetchPreferences, updatePreferences } from '../../context/preferences/actions';

interface Sport {
    name: string;
    teams: string[];
}

interface Preferences {
    sports?: string[];
    teams?: string[];
}

const sportsData: Sport[] = [
    { name: "Basketball", teams: ["Thunderbolts", "Dragonslayers", "Phoenix Rising", "Avalanche"] },
    { name: "American Football", teams: ["Titans", "Vortex Vipers", "Spectral Shadows", "Blitzkrieg"] },
    { name: "Field Hockey", teams: ["Stormbreakers", "Enigma Enforcers", "Blaze Squadron", "Phantom Phantoms"] },
    { name: "Table Tennis", teams: ["Celestial Chargers", "Rebel Renegades", "Inferno Ignitors", "Stealth Strikers"] },
    { name: "Cricket", teams: ["Nova Knights", "Crimson Crushers", "Rapid Raptors", "Shadow Assassins"] }
];

const Preferences: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
    const state = usePreferencesState();
    const dispatch = usePreferencesDispatch();
    const authToken = localStorage.getItem('authToken') || '';
    const defaultPreferences: Preferences = {
        sports: state.preferences?.teams?.flatMap(team => sportsData.filter(sport => sport.teams.includes(team)).map(sport => sport.name)) || [],
        teams: []
    };
    const [preferences, setPreferences] = useState<Preferences>(state.preferences || defaultPreferences);
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        fetchPreferences(dispatch, authToken); 
    }, [dispatch, authToken]);

    const handleUpdatePreferences = () => {
        updatePreferences(dispatch, preferences, authToken); 
    };

    const handleCancel = () => {
        closeModal();
        setPreferences(state.preferences || defaultPreferences);
    };

    const handleCheckboxChange = (sportName: string, teamName: string) => {
        setPreferences(prevPreferences => {
            const updatedTeams = prevPreferences.teams?.includes(teamName)
                ? prevPreferences.teams?.filter(team => team !== teamName)
                : [...(prevPreferences.teams || []), teamName];

            const updatedSports = updatedTeams.flatMap(team => sportsData.filter(sport => sport.teams.includes(team)).map(sport => sport.name));

            return { ...prevPreferences, sports: updatedSports, teams: updatedTeams };
        });
    };

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-25">
                    <div className="bg-white p-8 rounded-lg">
                        <h2 className="text-lg font-bold mb-4">Select Teams</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {sportsData.map(sport => (
                                <div key={sport.name}>
                                    <h3 className="text-lg font-bold mb-2">{sport.name}</h3>
                                    {sport.teams.map(team => (
                                        <label key={team} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={preferences.teams?.includes(team)}
                                                onChange={() => handleCheckboxChange(sport.name, team)}
                                                className="mr-2"
                                            />
                                            {team}
                                        </label>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={handleUpdatePreferences}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Preferences;