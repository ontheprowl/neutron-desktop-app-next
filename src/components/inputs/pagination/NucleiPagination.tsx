import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate"






export default function NucleiPagination({ items, startPage, pageSize, pagesDisplayed, startState, endState }: { items: any[], startPage?: number, pageSize?: number, pagesDisplayed?: number, startState: [number, React.Dispatch<React.SetStateAction<number>>], endState: [number, React.Dispatch<React.SetStateAction<number>>] }) {

    // * Pagination controls

    const [currPage, setPage] = useState(startPage ? startPage : 0);
    const perPageLimit = pageSize ? pageSize : 50

    const pages = Math.ceil(items.length / perPageLimit);


    useEffect(() => {
        startState[1](currPage * perPageLimit);
        endState[1](currPage * perPageLimit + perPageLimit);
    }, [currPage])


    return <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        nextClassName="justify-self-end"
        previousClassName="justify-self-start"
        renderOnZeroPageCount={(props) => {
            return null
        }}
        onPageChange={(currPage) => {
            setPage(currPage.selected)
        }}
        pageRangeDisplayed={pagesDisplayed ? pagesDisplayed : 2}
        marginPagesDisplayed={1}
        className="flex flex-row w-5/12 space-x-4 p-2 items-center justify-end"
        pageClassName='h-10 w-10 p-2 font-gilroy-medium text-center transition-all hover:bg-primary-dark hover:border-white rounded-xl'
        activeClassName=" bg-primary-dark text-white"
        pageCount={pages}
        previousLabel="<"
    />
}