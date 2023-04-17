import React from "react";
import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";

const SupplyTable = ({
  data
}) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [entriesPerPage, setEntriesPerPage] = React.useState(10);
  const [search, setSearch] = React.useState('');
  const router = useRouter();

  const filteredData = React.useMemo(() => {
    return data.filter((entry) => `${entry?.id}`?.toLowerCase().includes(search.toLowerCase()));
  }, [data, search]);

  const numberOfPages = React.useMemo(() => {
    return Math.ceil(filteredData.length / entriesPerPage)
  }, [filteredData, entriesPerPage]);

  const paginatedData = React.useMemo(() => {
    // entriesPerPage = 10
    // page 1 = 0, entriesPerPage
    // page 2 = entriesPerPage, entriesPerPage * 2
    // page 3 = entriesPerPage * 2, entriesPerPage * 3 
    // page X = entriesPerPage * (X - 1), entriesPerPage * X
    // ['a', 'b', 'c', 'd'].slice(0, 1) = ['a']
    // ['a', 'b', 'c', 'd'].slice(0, 2) = ['a', 'b']
    // [{ id: 'asasd', customer: 'asdasd }, { id: 'asasd', customer: 'asdasd }].slice(0, 1) = [{ id: 'asasd', customer: 'asdasd }]
    return filteredData.slice(entriesPerPage * currentPage, entriesPerPage * (currentPage + 1));
  }, [filteredData, entriesPerPage, currentPage]);

  /*
  const [numberOfPages, setNumberOfPages] = React.useState(0);
  React.useEffect(() => {
    setNumberOfPages(Math.ceil(data.length / entriesPerPage));
  }, [data, entriesPerPage]);
  */

  const toPage = React.useMemo(() => {
    const totalToPage = entriesPerPage * (currentPage + 1);

    if (filteredData.length > totalToPage) {
      return totalToPage;
    }

    return filteredData.length;
  }, [entriesPerPage, currentPage, filteredData]);

  const onPreviousClick = () => {
    // currentPage, setCurrentPage
    // setCurrentPage(currentPage > 0 ? currentPage - 1 : currentPage)
    setCurrentPage((curr) => curr > 0 ? curr - 1 : curr)

    //
    /* if (currentPage === 0) {
      return
    }
    
    setCurrentPage((curr) => curr - 1);
    */
  }

  // condition ? ifasda : elsesadas

  const onNextClick = () => {
    // currentPage, setCurrentPage, numberOfPage
    // setCurrentPage(currentPage + 1 < numberOfPages ? currentPage + 1 : currentPage) 
    setCurrentPage((curr) => curr + 1 < numberOfPages ? curr + 1 : curr)
  }
  

  const onEntriesPerPageChange = (event) => {
    setEntriesPerPage(event.target.value);
  }

  const onSearchChange = (event) => {
    setSearch(event.target.value);
  }

  return (
    <>
      <div class="flex items-center justify-between m-5">
        <div class="relative">
          <div class="text-lg font-medium leading-5 text-black">
            Show{" "}
            <select onChange={onEntriesPerPageChange} value={entriesPerPage} class="form-select text-black rounded drop-shadow-lg bg-white px-2 py-1">
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>{" "}
            Entries
          </div>
        </div>
        <label for="table-search" className="sr-only">
          Search
        </label>
        <div className="relative drop-shadow-lg">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-black"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block p-2 pl-10 text-sm text-gray-900 rounded-lg w-80"
            placeholder="Enter Information"
            onChange={onSearchChange}
            value={search}
          />
        </div>
      </div>
      <table className="w-full text-left">
        <thead className="bg-[#cfcfcf]">
          <tr>
            <th scope="col" className="px-6 py-3">
              Transaction ID
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          { paginatedData.map((transaction) => {
            return (
              <tr key={transaction.id}>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium whitespace-nowrap"
                >
                  {transaction.id}
                </th>
                <td class="px-6 py-4">{transaction.date_ordered}</td>
                <td class="px-6 py-4">
                  <button
                    class="bg-[#cfcfcf] text-black px-4 py-2 rounded-md text-sm font-medium"
                    onClick={() => {
                      router.push(`${router.asPath}/${transaction.id}`)
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            );
          }) }
        </tbody>
      </table>
      <nav
        class="flex items-center justify-between m-5"
        aria-label="Table navigation"
      >
        <span class="text-sm font-normal text-black">
          Showing{" "}
          <span class="font-semibold text-black">{(currentPage * entriesPerPage) + 1} to {toPage}</span> of{" "}
          <span class="font-semibold text-black">{filteredData.length} entries</span>
        </span>
        <ul class="flex list-style-none">
          <li class="page-item mx-2">
            <button
              class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-black hover:text-black focus:shadow-none"
              onClick={onPreviousClick}
            >
              Previous
            </button>
          </li>
          { Array.from(Array(numberOfPages), (_, i) => {
            return (
              <li class="page-item rounded bg-white drop-shadow-lg mx-2" key={i}>
                <button
                  class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 font-bold text-black hover:text-black hover:bg-gray-200 focus:shadow-none"
                  onClick={() => { setCurrentPage(i); }}
                >
                  {i + 1}
                </button>
              </li>
            )
          }) }
          
          <li class="page-item mx-2">
            <button
              class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-black hover:text-black hover:bg-gray-200 focus:shadow-none"
              onClick={onNextClick}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default SupplyTable;
