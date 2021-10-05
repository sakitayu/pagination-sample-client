import type { NextPage, GetServerSideProps } from 'next';
import React, { useEffect, useState, FC } from 'react';
import { User } from '@/Domain/Entity/User';
import { UserRepository } from '@/Domain/Repository/UserRepository';
import { PaginationParts } from '@/Presentation/Component/PaginationParts';
import { Container, Table } from 'react-bootstrap';

interface Props {
    currentPage: number;
}

const UsersIndex: NextPage<Props> = ({ currentPage }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [totalPages, setTotalPages] = useState<number>();

    useEffect(() => {
        UserRepository.index(currentPage).then(res => {
            setUsers(res.data);
            setTotalPages(res.totalPages);
        });
    }, [currentPage]);

    const trs = users.map(user => {
        return (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
            </tr>
        );
    });

    if (!totalPages) return null;

    return (
        <Container className='mx-auto my-5'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>{trs}</tbody>
            </Table>
            <Container className='d-flex justify-content-center mt-5'>
                <PaginationParts
                    totalPages={totalPages}
                    currentPage={currentPage}
                    targetPagePath={`?page=`}
                />
            </Container>
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    const currentPage = Number(ctx.query.page) || 1;
    return { props: { currentPage } };
};

export default UsersIndex;
