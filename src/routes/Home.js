import React from "react";
import { gql } from "apollo-boost";
import {useQuery} from "@apollo/react-hooks";

const GET_MOVIES = gql`
    {
        Movies {
            id
            medium_cover_image
        }
    }
`;

export default () => {
    const { loading, error, data } = useQuery(GET_MOVIES);
    if(loading) {
        return "loading...";
    }
    if(data && data.Movies) {
        return data.Movies.map(m => <h1>{m.id}</h1>);
    }
};