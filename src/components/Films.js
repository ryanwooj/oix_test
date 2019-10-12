import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const FILMS = gql`
    {
        allFilms {
            id
            title
            episodeId
            director
            releaseDate
        }
    }
`;

function Films() {
  const { loading, error, data } = useQuery(FILMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.allFilms.map(({ id, title, episodeId, director, releaseDate }) => (
    <div key={id}>
      <p>
        Episode {episodeId} - {title} [{id}]: Directed by {director}, Released {releaseDate}
      </p>
    </div>
  ));
}

export default Films;