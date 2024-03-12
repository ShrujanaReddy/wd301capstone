import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useArticlesState } from '../../context/articles/context';

const ArticleListItems = () => {
  const state = useArticlesState();
  const { articles, articleDetails, isLoading, isError, errorMessage } = state || {};
  const [isOpen, setIsOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<number | undefined>(undefined);

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
      {articles.map((article) => (
        <div
          key={article.id}
          onClick={() => openModal(article.id)}
          className="article block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
        >
          <h5 className="text-xl font-bold tracking-tight text-gray-800 dark:text-white">
            {article.title}
          </h5>
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-auto mt-2 mb-4 rounded-lg"
          />
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {article.summary}
          </p>
        </div>
      ))}

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all overflow-y-auto max-h-[80vh]">
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
    </>
  );
};

export default ArticleListItems;
