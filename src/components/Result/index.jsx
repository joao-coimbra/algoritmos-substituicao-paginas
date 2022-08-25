import { useEffect, useState } from 'react';
import './styles.scss';

import Table from './Table';

function Result({ seq, quadros, result, falhas }) {

    const [selected, setSelected] = useState({ fifo: true })

    const [resultTable, setResultTable] = useState([])

    useEffect(() => {

        // console.log(result)

        let r = []

        if (!!result.length) {
            for (let index = 0; index < (seq.length - 1); index++) {
                console.log(!result[index])
                r = [...r,
                    {
                        seq: seq[index],
                        quadros: !!result[index]
                            ? result[index] !== result[index-1]
                                ? result[index]
                                : Array(quadros).fill(null)
                            : Array(quadros).fill(null)
                    }
                ];
            }

            setResultTable(r);

        } else {
            setResultTable(Array(14).fill(
                {
                    seq: null,
                    quadros: Array(quadros).fill(null)
                }
            ));
        }


    }, [seq, result, quadros])

    return (
        <div className="result">
            <div className="buttons">
                <button className={selected.fifo ? 'selected' : ''}
                    onClick={() => setSelected({ fifo: true })}
                >FIFO</button>
                <button className={selected.great ? 'selected' : ''}
                    onClick={() => setSelected({ great: true })}
                >Ótimo</button>
                <button className={selected.lru ? 'selected' : ''}
                    onClick={() => setSelected({ lru: true })}
                >LRU</button>
                <button className={selected.lifo ? 'selected' : ''}
                    onClick={() => setSelected({ lifo: true })}
                >LIFO</button>
            </div>

            <Table collums={resultTable} />

            <div className='process'><span>{falhas}</span> Falhas</div>
        </div>
    )
}

export default Result;