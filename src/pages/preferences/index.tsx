// Preferences component
import React, { useEffect, useState } from 'react';
import { usePreferencesDispatch, usePreferencesState } from '../../context/preferences/context';
import { fetchPreferences, updatePreferences } from '../../context/preferences/actions';

const sports: string[] = ["Basketball", "Table Tennis", "American Football", "Cricket", "Field Hockey"];
const teams: Record<string, string[]> = {
  "Basketball": [
    "Thunderbolts",
    "Dragonslayers",
    "Phoenix Rising",
    "Avalanche"
  ],
  "American Football": [
    "Titans",
    "Vortex Vipers",
    "Spectral Shadows",
    "Blitzkrieg"
  ],
  "Field Hockey": [
    "Stormbreakers",
    "Enigma Enforcers",
    "Blaze Squadron",
    "Phantom Phantoms"
  ],
  "Table Tennis": [
    "Celestial Chargers",
    "Rebel Renegades",
    "Inferno Ignitors",
    "Stealth Strikers"
  ],
  "Cricket": [
    "Nova Knights",
    "Crimson Crushers",
    "Rapid Raptors",
    "Shadow Assassins"
  ]
};

const Preferences: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
    const state = usePreferencesState();
    const dispatch = usePreferencesDispatch();
    const authToken = localStorage.getItem('authToken') || '';
    const [preferences, setPreferences] = useState(state.preferences || { sports: [], teams: [] });
    const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        fetchPreferences(dispatch, authToken); 
    }, [dispatch, authToken]);

    const handleUpdatePreferences = () => {
        updatePreferences(dispatch, preferences, authToken); 
    };

    const handleCancel = () => {
        closeModal();
        setPreferences(state.preferences || { sports: [], teams: [] });
    };

    return(
        <>
        {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-25">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Select Teams</h2>
            <div className="grid grid-cols-3 gap-4">
              {sports.map(sport => (
                <div key={sport}>
                  <h3 className="text-lg font-bold mb-2">{sport}</h3>
                  {teams[sport]?.map(team => (
                    <label key={team} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedTeams.includes(team)}
                        onChange={() => {
                          setSelectedTeams(prevTeams =>
                            prevTeams.includes(team)
                              ? prevTeams.filter(t => t !== team)
                              : [...prevTeams, team]
                          );
                        }}
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
                onClick={() => setSelectedTeams([])}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-2"
              >
                Clear
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
    )
}

export default Preferences;
