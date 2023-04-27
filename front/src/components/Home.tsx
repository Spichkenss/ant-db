'use client'
import {Button, Input, Table, Typography} from "antd";
import {ColumnProps} from 'antd/es/table';

import axios from "axios";
import {useEffect, useState} from 'react';

interface IUser {
    id: number
    name: string,
    surname: string,
    age: number,
    email: string
    createdAt: Date
}

interface CreateUserDto extends Omit<IUser, 'id' | 'createdAt'> {
}

const columns: ColumnProps<IUser>[] = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Имя',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Фамилия',
        dataIndex: 'surname',
        key: 'surname',
    },
    {
        title: 'Возраст',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Почта',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Дата создания',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text, record, index) => new Date(text).toLocaleString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        })
    },
];

const Home = () => {
    // Локальное состояние приложения, хранящее в себе массив пользователей
    const [users, setUsers] = useState<IUser[]>([])

    // Локальное состояние приложения, хранящее в себе данные для создания нового пользователя
    const [userData, setUserData] = useState<CreateUserDto>({
        name: '',
        surname: '',
        age: 0,
        email: ''
    });

    // Хук (по сути функция) для запуска функции внутри при первом рендере компонента и при изменении зависимостей в [] ниже
    useEffect(() => {
        getUsersFromServer()
    }, []) // <---- вот здесь зависимости


    // функция для отправки нового пользователя на сервер и сохранения в локальный стейт
    const sendUserToServer = () => {
        if (userData) {
            axios.post<IUser>('http://localhost:3001/api/users/add', userData).then(({data}) => setUsers(prevState => [...prevState, data]));
            setUserData({email: '', age: 0, name: '', surname: ''})
        }


    }

    // функция для получени всех пользователей с сервера и сохранения в локальный стейт
    const getUsersFromServer = () => {
        axios.get<IUser[]>('http://localhost:3001/api/users').then(({data}) => setUsers(data));
    }

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const age = Number(e.target.value);
        if (!Number.isNaN(age)) {
            setUserData({...userData, age});
        }
    };


    // разметка страницы. тут форма создания пользователя и таблица
    return (
        <div>
            <div className={'flex flex-col bg-gray-300 gap-2 p-2 max-w-[400px]'}>
                <Typography>Добавить пользователя</Typography>
                <Input placeholder={'Имя'} type={'text'}
                       onChange={(e) => setUserData({...userData, name: e.target.value})}/>
                <Input placeholder={'Фамилия'} type={'text'}
                       onChange={(e) => setUserData({...userData, surname: e.target.value})}/>
                <Input placeholder={'Возраст'} type={'number'}
                       onChange={handleAgeChange}/>
                <Input placeholder={'Почта'} type={'email'}
                       onChange={(e) => setUserData({...userData, email: e.target.value})}/>
                <Button onClick={sendUserToServer}>Добавить</Button>

            </div>
            <Table dataSource={users} columns={columns} rowKey={'id'}/>
        </div>
    )
};

export default Home;


