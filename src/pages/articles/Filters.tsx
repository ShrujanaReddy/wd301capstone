import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useArticlesState } from '../../context/articles/context';
import { Article } from '../../context/articles/reducer';

interface Props {
  article: Article;
  openModal: (id: number) => void;
}

const teams = {
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

const Filters = () => {
  const state = useArticlesState();
  const { articles, articleDetails, isLoading, isError, errorMessage } = state || {};
  const [isOpen, setIsOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<number | undefined>(undefined);
  const [selectedSport, setSelectedSport] = useState<string | undefined>('All');
  const [selectedTeam, setSelectedTeam] = useState<string | undefined>('All');

  const getDetails = (articleId: number) => {
    const article = articleDetails[articleId];
    return article ? {
      title: article.title,
      thumbnail: article.thumbnail,
      content: article.content
    } : null;
  };

  if (!articles || isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  const openModal = (articleid: number) => {
    setSelectedArticleId(articleid);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedArticleId(undefined);
  };

  const selectedArticle = selectedArticleId !== undefined ? getDetails(selectedArticleId) : null;

  const filteredArticles = articles.filter(article => {
    if (selectedSport === 'All') return true;
    if (selectedTeam === 'All') return article.sport.name === selectedSport;
    return article.sport.name === selectedSport && article.teams.some(team => team.name === selectedTeam);
  });

  return (
    <>
        <div className="flex-1 bg-gray-200">
        <div className='text-xl font-bold mb-2 text-center'>Favourites</div>
          <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">Sport</label>
              <select
                id="sport"
                name="sport"
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={selectedSport || 'All'}
                onChange={(e) => setSelectedSport(e.target.value)}
              >
                <option value="All">All</option>
                {Object.keys(teams).map((sport) => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>
              {selectedSport !== 'All' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Team</label>
                  <select
                    id="team"
                    name="team"
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={selectedTeam || 'All'}
                    onChange={(e) => setSelectedTeam(e.target.value)}
                  >
                    <option value="All">All</option>
                    {teams[selectedSport as keyof typeof teams]?.map((team) => (
                      <option key={team} value={team}>{team}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredArticles.map((article) => (
                <FilteredArticleCard key={article.id} article={article} openModal={openModal} />
              ))}
            </div>
        </div>

      {selectedArticle && (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="overflow-y-auto max-h-[80vh]" onClose={closeModal}>
            <Transition.Child
                       as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all overflow-y-auto max-h-[80vh]">
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none z-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {selectedArticle?.title}
                </Dialog.Title>
                <img
                  src={selectedArticle?.thumbnail}
                  alt={selectedArticle?.title}
                  className="w-full h-auto mt-2 mb-4 rounded-lg"
                />
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {selectedArticle?.content}
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 mt-4 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Close
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )}
</>
);
};

const FilteredArticleCard: React.FC<Props> = ({ article, openModal }) => (
  <div  
    key={article.id} 
    onClick={() => openModal(article.id)}
    className="filtered-article flex p-4 bg-white border border-gray-200 m-2 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
  >
    <div className="flex-1">
        <h5 className="text-l font-bold tracking-tight text-gray-800 dark:text-white">
        {article.title}
        </h5>
        <p className="text-sm text-gray-700 dark:text-gray-300 overflow-hidden overflow-ellipsis h-16">
        {article.summary}
        </p>
        <div className='flex justify-center'>
            <button
            type="button"
            onClick={() =>openModal(article.id)}
            className="justify-center rounded-md border border-transparent bg-blue-100 mt-2 px-10 py-1 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
            Read More
            </button>
        </div>
    </div>
  </div>
);

export default Filters;