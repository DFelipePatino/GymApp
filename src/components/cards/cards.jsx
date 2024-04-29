import React from 'react'
import { useSelector } from 'react-redux';

function cards() {

    const results = useSelector((state) => state.results);

    return (

        <section className='results'>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>{result}</li>
                ))}

            </ul>
        </section>
    )
}

export default cards