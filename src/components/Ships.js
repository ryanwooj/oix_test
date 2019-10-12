import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { gql } from 'apollo-boost';
import Ship from './Ship';
import classes from '../styles/Ships.module.scss';
const STARSHIPS = gql`
  {
    allStarships {
      id
      name
      manufacturer
      className: class
      costInCredits
      passengers
      crew
      cargoCapacity
      length
      hyperdriveRating
      maxAtmospheringSpeed
      films {
        id
        title
      }
    }
  }
`;

function Ships({ star }) {
  const { loading, error, data } = useQuery(STARSHIPS);
  const [modal, setModal] = useState(false);
  const [shine, setShine] = useState(false);

  const [currentShip, setShip] = useState('');

  const openModal = id => {
    setModal(!modal);
    setShip(id);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <div>
        {modal ? (
          <Ship modal={modal} openModal={openModal} currentShip={currentShip} />
        ) : (
          ''
        )}
      </div>
      <div className={classes.Ships}>
        {getShip(data, modal, openModal, star)}
      </div>
    </div>
  );
}

const getShip = (data, modal, openModal, star) => {
  return data.allStarships.map(
    ({
      name,
      id,
      manufacturer,
      className,
      costInCredits,
      passengers,
      crew,
      cargoCapacity,
      length,
      hyperdriveRating,
      maxAtmospheringSpeed
    }) => (
      <div key={id} className={classes.card} onClick={() => openModal(id)}>
        <div className={classes.endSection}>
          <p>
            <span>{name.toUpperCase()}</span> <br />[
            <span className={classes.starshipId}>{id}</span>]:
          </p>
          <p className={classes.purText}>{className} class starship</p>
          <p>
            <span>Manufactured by: </span> <br />
            <span className={classes.purText}>{manufacturer}</span>
          </p>
        </div>
        <div className={classes.endSection}>
          <span>Price in Credits:</span>
          <p className={classes.purText}>{costInCredits}</p>
        </div>
        <div className={classes.endSection}>
          <p style={{ textAlign: 'left', paddingLeft: '1em' }}>Capacities</p>
          <p>
            <span>Crew:</span> {crew}
          </p>
          <p>
            <span>Passengers:</span> {passengers}{' '}
          </p>
          <p>
            <span>Cargo:</span> {cargoCapacity}
          </p>
        </div>
        <div>
          <p style={{ textAlign: 'left', paddingLeft: '1em' }}>Stats</p>
          <p>
            <span>Length:</span> {length}m
          </p>
          <p>
            <span>HyperdriveRating:</span> {hyperdriveRating}
          </p>
          <p>
            <span>Max Atmo Speed:</span>
            {maxAtmospheringSpeed ? maxAtmospheringSpeed : 'Missing'}
          </p>
        </div>
      </div>
    )
  );
};

const mapStateToProps = state => ({
  star: state.favorites.collections
});

export default connect(mapStateToProps)(Ships);
