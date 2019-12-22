import React, { memo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import _ from 'lodash';


const GET_USERS = gql`
    query getUsers {
        users {
            id
            name
            email
        }
    }
`;

const HomePage = memo(() => {
    const { loading, error, data } = useQuery(GET_USERS);

    if (error) return 'Error!!!';
    if (loading || !data) return 'Loading...';

    return (
        <div>
            {_.map(data.users, (user) => (
                <h1 key={user.id}>{user.name}</h1>
            ))}
        </div>
    );
});


export default HomePage;