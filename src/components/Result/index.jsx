import { useEffect, useState } from 'react';
import './styles.scss';

import Table from './Table';

function Result({ seq, quadros }) {

    const [selected, setSelected] = useState({fifo: true})

    const [result, setResult] = useState([])

    useEffect(() => {

        let r = []

        for (let index = 0; index < (seq.length-1); index++) {
            r = [...r,
                {
                    seq: seq[index],
                    quadros: Array(parseInt(quadros) || 1).fill(null)
                }
            ];
        }

        setResult([...r])

    }, [seq, quadros])

    return (
        <div className="result">
            <div className="buttons">
                <button className={selected.fifo ? 'selected' : ''}
                    onClick={() => setSelected({fifo: true})}
                >FIFO</button>
                <button className={selected.great ? 'selected' : ''}
                    onClick={() => setSelected({great: true})}
                >Ótimo</button>
                <button className={selected.lru ? 'selected' : ''}
                    onClick={() => setSelected({lru: true})}
                >LRU</button>
                <button className={selected.lifo ? 'selected' : ''}
                    onClick={() => setSelected({lifo: true})}
                >LIFO</button>
            </div>
            
            <Table collums={result} />

            <button className='process'>Processar</button>
        </div>
    )
}

export default Result;