import type { NextPage } from 'next';
import React, { useEffect, useState, FC } from 'react';
import { User } from '@/Domain/Entity/User';
import { UserRepository } from '@/Domain/Repository/UserRepository';

const Home: NextPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [totalPages, setTotalPages] = useState<number>();

    useEffect(() => {
        UserRepository.index().then(res => {
            setUsers(res.data);
            setTotalPages(res.totalPages);
        });
    }, []);

    return <div>ここにユーザー一覧</div>;
};

export default Home;
