import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { changeFav } from '../actions/favorites';
import { gql } from 'apollo-boost';
import classes from '../styles/Ship.module.scss';

const Ship = ({ modal, openModal, currentShip, changeFav, star }) => {
  const STARSHIP = gql`
    query Starship($currentShip: ID!) {
      Starship(id: $currentShip) {
        id
        name
        manufacturer
        className: class
        costInCredits
        passengers
        crew
        cargoCapacity
        consumables
        length
        mglt
        createdAt
        hyperdriveRating
        maxAtmospheringSpeed
        films {
          id
          title
        }
        pilots {
          name
          gender
          skinColor
          birthYear
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(STARSHIP, {
    variables: { currentShip }
  });

  const [shine, setShine] = useState(false);

  useMemo(
    () =>
      star &&
      star.map(item => {
        if (item.id === currentShip) {
          setShine(true);
        }
      }),
    [star]
  );

  if (modal) {
    if (loading) return <p>Loading a new Ship...</p>;
    if (error) return <p>Error :(</p>;

    return (
      <div id='myModal' className={classes.modal} key={data.Starship.id}>
        {console.log(star)}
        <div className={classes.modalContent}>
          <div className={classes.modalHeader}>
            <div className={classes.close}>
              <i className='material-icons' onClick={openModal}>
                close
              </i>
            </div>
          </div>
          <div className={classes.modalBody}>
            <div className={classes.shipHeader}>
              <div>
                <i
                  className='material-icons'
                  onClick={() => {
                    changeFav(currentShip);
                  }}
                  style={
                    shine
                      ? {
                          color: 'gold',
                          fontSize: '2em'
                        }
                      : {
                          color: 'grey',
                          fontSize: '2em'
                        }
                  }>
                  star
                </i>{' '}
                [<span className={classes.shipId}>{data.Starship.id}</span>]
              </div>
              <div className={classes.shipName}>
                {data.Starship.name.toUpperCase()}
              </div>
              <div className={classes.shipClass}>{data.Starship.className}</div>
              <div className={classes.shipManu}>
                {data.Starship.manufacturer.map((item, index) => (
                  <>
                    <span key={index}>
                      [{index + 1}] {item}
                    </span>
                    <br />
                  </>
                ))}
              </div>
              <br />
              {data.Starship.pilots
                ? data.Starship.pilots.map((pilot, index) => (
                    <div key={index} className={classes.pilots}>
                      <div>
                        <span>Pilot</span> <br /> {pilot.name}
                      </div>
                      <div>
                        <span style={{ color: 'blue' }}>Gender </span>
                        <br /> {pilot.gender}
                      </div>
                      <div>
                        <span style={{ color: 'red' }}>SkinColor</span> <br />
                        {pilot.skinColor}
                      </div>
                      <div>
                        <span style={{ color: 'gold' }}>Age </span>
                        <br /> {pilot.birthYear}
                      </div>
                      <br />
                    </div>
                  ))
                : ''}
            </div>
            <div className={classes.shipCenter}></div>
            <div className={classes.shipBody}>
              {data.Starship.films &&
                data.Starship.films.map(film => (
                  <div className={classes.film}>
                    <div className={classes.filmId}>{film.id}</div>
                    <div className={classes.filmTitle}>{film.title}</div>
                  </div>
                ))}
              <div className={classes.endSection}>
                <p style={{ textAlign: 'left', paddingLeft: '1em' }}>
                  Price in Credits:
                </p>
                <p className={classes.purText}>{data.Starship.costInCredits}</p>
              </div>
              <div className={classes.endSection}>
                <p style={{ textAlign: 'left', paddingLeft: '1em' }}>
                  Capacities
                </p>
                <p>
                  <span>Crew:</span> {data.Starship.crew}
                </p>
                <p>
                  <span>Passengers:</span> {data.Starship.passengers}{' '}
                </p>
                <p>
                  <span>Cargo:</span> {data.Starship.cargoCapacity}
                </p>
              </div>
              <div>
                <p style={{ textAlign: 'left', paddingLeft: '1em' }}>Stats</p>
                <p>
                  <span>Length:</span> {data.Starship.length}m
                </p>
                <p>
                  <span>HyperdriveRating:</span>{' '}
                  {data.Starship.hyperdriveRating}
                </p>
                <p>
                  <span>Max Atmo Speed:</span>
                  {data.Starship.maxAtmospheringSpeed
                    ? data.Starship.maxAtmospheringSpeed
                    : 'Missing'}
                </p>
                <p>
                  <span>Megalit:</span> {data.Starship.mglt}
                </p>
                <p>
                  <span>Max Consumable:</span>
                  {data.Starship.consumables}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return;
  }
};

const mapStateToProps = state => ({
  star: state.favorites.collections
});

export default connect(
  mapStateToProps,
  { changeFav }
)(Ship);
