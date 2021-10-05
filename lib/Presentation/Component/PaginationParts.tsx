import React from 'react';
import { Pagination } from 'react-bootstrap';
import Router from 'next/router';
interface Props {
    totalPages: number;
    currentPage: number;
    targetPagePath: string;
}

const totalPageIndications = 5;
const middlePagePosition = Math.floor(totalPageIndications / 2) + 1;

export const PaginationParts: React.FC<Props> = props => {
    const paginationItems = [...Array(totalPageIndications)].map((e, key) => {
        const pageNumber = key + 1;
        const pageNumberAroundMiddlePage =
            pageNumber + props.currentPage - middlePagePosition;
        const pageNumberUpToLastPage =
            pageNumber + props.totalPages - totalPageIndications;
        if (pageNumber > props.totalPages) return null;
        if (
            props.currentPage <= middlePagePosition ||
            props.totalPages <= totalPageIndications
        ) {
            return (
                <Pagination.Item
                    key={pageNumber}
                    onClick={() =>
                        Router.push(props.targetPagePath + pageNumber)
                    }
                    active={pageNumber === props.currentPage}
                    className='mx-1'
                >
                    {pageNumber}
                </Pagination.Item>
            );
        } else if (
            props.totalPages > totalPageIndications &&
            props.currentPage >= middlePagePosition &&
            props.currentPage + middlePagePosition <= props.totalPages
        ) {
            return (
                <Pagination.Item
                    key={pageNumberAroundMiddlePage}
                    onClick={() =>
                        Router.push(
                            props.targetPagePath + pageNumberAroundMiddlePage,
                        )
                    }
                    active={pageNumberAroundMiddlePage === props.currentPage}
                    className='mx-1'
                >
                    {pageNumberAroundMiddlePage}
                </Pagination.Item>
            );
        } else if (
            props.totalPages > totalPageIndications &&
            props.currentPage + middlePagePosition > props.totalPages
        ) {
            return (
                <Pagination.Item
                    key={pageNumberUpToLastPage}
                    onClick={() =>
                        Router.push(
                            props.targetPagePath + pageNumberUpToLastPage,
                        )
                    }
                    active={pageNumberUpToLastPage === props.currentPage}
                    className='mx-1'
                >
                    {pageNumberUpToLastPage}
                </Pagination.Item>
            );
        }
    });

    return (
        <Pagination className='align-items-center'>
            <Pagination.First
                onClick={() =>
                    props.currentPage !== 1 &&
                    Router.push(props.targetPagePath + 1)
                }
                className='mx-1'
            />
            <Pagination.Prev
                onClick={() =>
                    props.currentPage !== 1 &&
                    Router.push(props.targetPagePath + (props.currentPage - 1))
                }
                className='mx-1'
            />
            {paginationItems}
            <Pagination.Next
                onClick={() =>
                    props.currentPage !== props.totalPages &&
                    Router.push(props.targetPagePath + (props.currentPage + 1))
                }
                className='mx-1'
            />
            <Pagination.Last
                onClick={() =>
                    props.currentPage !== props.totalPages &&
                    Router.push(props.targetPagePath + props.totalPages)
                }
                className='mx-1'
            />
        </Pagination>
    );
};
