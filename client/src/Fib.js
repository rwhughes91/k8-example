import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Fib = () => {
  const [state, setState] = useState({
    seenIndexes: [],
    values: {},
    index: '',
  });

  const fetchValues = useCallback(async () => {
    const values = await axios.get('/api/values/current');
    setState((prevState) => ({ ...prevState, values: values.data }));
  }, []);

  const fetchIndexes = useCallback(async () => {
    const seenIndexes = await axios.get('/api/values/all');
    setState((prevState) => ({ ...prevState, seenIndexes: seenIndexes.data }));
  }, []);

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, [fetchValues, fetchIndexes]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log('submitted');

    await axios.post('/api/values', {
      index: state.index,
    });

    setState((prevState) => ({ ...prevState, index: '' }));
  };

  const renderSeenIndexes = () => {
    return state.seenIndexes.map(({ number }) => number).join(', ');
  };

  const renderValues = () => {
    const entries = [];

    for (let key in state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {state.values[key]}
        </div>
      );
    }
    return entries;
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label>Enter your index</label>
        <input
          value={state.index}
          onChange={(event) =>
            setState((prevState) => ({
              ...prevState,
              index: event.target.value,
            }))
          }
        />
        <button type='submit'>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated values:</h3>
      {renderValues()}
    </div>
  );
};

export default Fib;
