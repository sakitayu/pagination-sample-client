import React from 'react';
import { Pagination } from 'react-bootstrap';
import Router from 'next/router';
interface Props {
    totalPages: number;
    currentPage: number;
    targetPagePath: string;
}

// ページネーションの数字ボタンの数
const totalPageIndications = 5;
// ページネーションの数字ボタンの真ん中の位置 (5の場合は3, 10の場合は6)
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
            props.currentPage + middlePagePosition - 1 >
            props.totalPages
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
        } else {
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
        }
    });

    return (
        <Pagination className='align-items-center'>
            <Pagination.First
                onClick={() => Router.push(props.targetPagePath + 1)}
                className='mx-1'
                disabled={props.currentPage == 1}
            />
            <Pagination.Prev
                onClick={() =>
                    Router.push(props.targetPagePath + (props.currentPage - 1))
                }
                className='mx-1'
                disabled={props.currentPage == 1}
            />
            {paginationItems}
            <Pagination.Next
                onClick={() =>
                    Router.push(props.targetPagePath + (props.currentPage + 1))
                }
                className='mx-1'
                disabled={props.currentPage == props.totalPages}
            />
            <Pagination.Last
                onClick={() =>
                    Router.push(props.targetPagePath + props.totalPages)
                }
                className='mx-1'
                disabled={props.currentPage == props.totalPages}
            />
        </Pagination>
    );
};
