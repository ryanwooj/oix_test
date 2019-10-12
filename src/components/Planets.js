import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import classes from '../styles/Planets.module.scss';
import debounce from 'lodash.debounce';
import { connect } from 'react-redux';
import { sortOver, sortLess, sortHigh, sortLow } from '../actions/sorts';

function Planets({ sortOver, sortLess, sortHigh, sortLow, result }) {
  const [loadError, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [copy, setCopy] = useState(false);
  const [currentCount, setCurrentCount] = useState(10);
  const [planet, setPlanet] = useState(null);
  const [optionValue, setOptionValue] = useState('all');

  const PLANETS = gql`
    {
      allPlanets {
        climate
        createdAt
        diameter
        films {
          id
          title
        }
        gravity
        id
        name
        population
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(PLANETS);

  useMemo(() => {
    data && setPlanet(data.allPlanets);
    data && setCopy(data.allPlanets);
  }, [data]);

  useMemo(() => {
    result && setPlanet(result);
  }, [result]);

  window.onscroll = debounce(async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setCurrentCount(currentCount + 10);
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleChange = event => {
    setOptionValue(event.target.value);

    let value = event.target.value;
    if (value === 'more') {
      sortOver(data.allPlanets);
    } else if (value === 'less') {
      sortLess(data.allPlanets);
    } else if (value === 'highLow') {
      sortHigh(data.allPlanets);
    } else if (value === 'lowHigh') {
      sortLow(data.allPlanets);
    } else if (value === 'all') {
      setPlanet(copy);
    }
  };

  return (
    <>
      <div className={classes.dropdown}>
        <select value={optionValue} onChange={handleChange}>
          <option value='all'>ALL</option>
          <option value='more'>Population more than 10000</option>
          <option value='less'>Population less than 10000 </option>
          <option value='highLow'>Population High to Low</option>
          <option value='lowHigh'>Population Low to High</option>
        </select>
        {planet.length > 1 &&
          planet.map(({ name, population, gravity, id, diameter }) => (
            <div key={id} style={{ marginTop: '60px' }}>
              <p>
                {name}[{id}]: Population of {population}, diameter: {diameter},
                and gravity of '{gravity}'
              </p>
            </div>
          ))}
      </div>
    </>
  );
}

Planets.propTypes = {};

const mapStateToProps = state => ({
  result: state.sorts.result
});

export default connect(
  mapStateToProps,
  { sortLess, sortOver, sortHigh, sortLow }
)(Planets);
