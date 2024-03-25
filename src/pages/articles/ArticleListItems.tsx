import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Tab } from '@headlessui/react';
import { useArticlesState } from '../../context/articles/context';
import { Article } from '../../context/articles/reducer';

interface Props {
  article: Article;
  openModal: (id: number) => void;
}

const sports = ["All", "Basketball", "Table Tennis", "American Football", "Cricket", "Field Hockey"];

const ArticleListItems = () => {
  const state = useArticlesState();
  const { articles, articleDetails, isLoading, isError, errorMessage } = state || {};
  const [isOpen, setIsOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<number | undefined>(undefined);
  const [selectedSport, setSelectedSport] = useState<string | undefined>('All');

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

  return (
    <>
      <Tab.Group>
        <Tab.List className="flex p-1 m-2 space-x-1 bg-blue-100 rounded-lg">
          {sports.map((sport) => (
            <Tab key={sport} onClick={() => setSelectedSport(sport)} className={({ selected }) => `${selected ? 'bg-white text-black' : 'text-blue-900'} flex-1 py-2 px-4 text-center rounded-lg`}>
              {sport}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {sports.map((sport) => (
            <Tab.Panel key={sport}>
              {articles.filter(article => sport === 'All' || article.sport.name === sport).map((article) => (
                <ArticleCard key={article.id} article={article} openModal={openModal} />
              ))}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

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

const ArticleCard: React.FC<Props> = ({ article, openModal }) => (
  <div  
    key={article.id} 
    onClick={() => openModal(article.id)}
    className="article flex p-6 bg-white border border-gray-200 m-2 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
  >
    <div className="flex-1">
      <h5 className="text-xl font-bold tracking-tight text-gray-800 dark:text-white">
        {article.title}
      </h5>
      <p className="text-sm text-gray-700 dark:text-gray-300 overflow-hidden overflow-ellipsis h-16">
        {article.summary}
      </p>
      <button
        type="button"
        onClick={() =>openModal(article.id)}
        className="mt-auto inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Read More
      </button>
    </div>
    <div className="flex-none w-1/3 pl-4">
      <div className="relative w-full h-40 overflow-hidden rounded-lg">
        <img
          src={article.thumbnail}
          alt={article.title}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  </div>
);

export default ArticleListItems;