import React from "react";
import {useParams} from "react-router-dom";
import {gql} from "apollo-boost";
import {useQuery} from "@apollo/react-hooks";
import styled from "styled-components";
import Movie from "../components/Movie";

const GET_MOVIE = gql`
    query getMovie($id: Int!) {
        movie(id: $id) {
            title
            medium_cover_image
            language
            rating
            description_full
        }
        suggestions(id: $id) {
            id
            title
            medium_cover_image
        }
    }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
  width: 50%;
`;

const Poster = styled.div`
  width: 25%;
  height: 300px;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;
`;

export default () => {
    const { id } = useParams();
    const { loading, data } = useQuery(GET_MOVIE, {
        variables: { id: Number(id) }
    });
    return (
        <Container>
            <Column>
                <Poster bg={data?.movie?.medium_cover_image}></Poster>
                <Title>{loading ? "Loading..." : data.movie.title}</Title>
                {!loading && (
                    <>
                        <Subtitle>{data?.movie?.language} · {data?.movie?.rating}</Subtitle>
                        <Description>{data?.movie?.description_full}</Description>
                    </>
                )}
            </Column>
            <Column>
            {data?.suggestions?.map(s => <Movie key={s.id} id={s.id} bg={s.medium_cover_image}/>)}
            </Column>
        </Container>
    );
}