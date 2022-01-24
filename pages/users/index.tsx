import type { NextPage, GetServerSideProps } from 'next';
import React, { useEffect, useState, FC } from 'react';
import { PaginationParts } from 'component/PaginationParts';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Container, Table } from 'react-bootstrap';

class RestClient {
    constructor(private readonly token: string) {}

    async get<ResponseInterface>(
        path: string,
    ): Promise<AxiosResponse<ResponseInterface>> {
        return await axios.get<ResponseInterface>(path, this.requestConfig);
    }

    private get requestConfig(): AxiosRequestConfig {
        return {
            baseURL: 'http://localhost:3000',
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.token ? `Bearer ${this.token}` : '',
            },
        };
    }
}

export function getNoAuthClient(): RestClient {
    return new RestClient('');
}

class User {
    constructor(
        public id: number,
        public name: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
}

interface UserResponseObject {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}
interface Props {
    currentPage: number;
}

const UsersIndex: NextPage<Props> = ({ currentPage }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [totalPages, setTotalPages] = useState<number>();

    useEffect(() => {
        fetchDate();
    }, [currentPage]);

    const fetchDate = async () => {
        const res = await getNoAuthClient().get<UserResponseObject[]>(
            `/users?page=${currentPage}`,
        );
        const users = (res: UserResponseObject) =>
            new User(
                res.id,
                res.name,
                new Date(res.created_at),
                new Date(res.updated_at),
            );
        setUsers(res.data.map(users));
        setTotalPages(Number(res.headers['total-pages']));
    };

    const trs = users.map(user => {
        return (
            <tr key={user.id}>
                <td style={{ width: '5%' }}>{user.id}</td>
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
