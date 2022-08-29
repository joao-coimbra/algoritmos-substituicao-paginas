import { useEffect, useState } from 'react';
import './styles.scss';

import Table from './Table';

function Result({ seq, quadros, result, falhas, setMethod }) {

    const [selected, setSelected] = useState({ fifo: true })

    const [resultTable, setResultTable] = useState([])
    const [viewFails, setViewFails] = useState(false);
    // const [clickable, setClickable] = useState(false);
    // console.log(falhas)

    useEffect(() => {

        // console.log(result)

        let r = []

        if (!!result.length) {
            for (let index = 0; index < (seq.length - 1); index++) {

                r = [...r,
                    {
                        seq: seq[index],
                        quadros: !!result[index]
                            ? result[index] !== result[index-1]
                                ? result[index]
                                : Array(quadros).fill(null)
                            : Array(quadros).fill(null),
                        fail: falhas[index]
                    }
                ];
            }

            setResultTable([...r, ...Array(14-r.length > 0 ? 14-r.length : 0 ).fill({
                seq: null,
                quadros: Array(quadros).fill(null),
            })]);

        } else {
            setResultTable(Array(14).fill(
                {
                    seq: null,
                    quadros: Array(quadros).fill(null)
                }
            ));
        }


    }, [seq, result, quadros, falhas])

    return (
        <div className="result">
            <div className="buttons">
                <button className={selected.fifo ? 'selected' : ''}
                    onClick={() => {
                        setMethod('fifo')
                        setSelected({ fifo: true })
                    }}
                >FIFO</button>
                <button className={selected.optimal ? 'selected' : ''}
                    onClick={() => {
                        setMethod('optimal')
                        setSelected({ optimal: true })
                    }}
                >Ótimo</button>
                <button className={selected.lru ? 'selected' : ''}
                    onClick={() => {
                        setMethod('lru')
                        setSelected({ lru: true })
                    }}
                >LRU</button>
                <button className={selected.lifo ? 'selected' : ''}
                    onClick={() => {
                        setMethod('lifo')
                        setSelected({ lifo: true })
                    }}
                >LIFO</button>
            </div>

            <label htmlFor="method">Método
                <select defaultValue='fifo'
                    onChange={e => setMethod(e.target.value)}
                >
                    <option value="fifo">FIFO</option>
                    <option value="optimal">ÓTIMO</option>
                    <option value="lru">LRU</option>
                    <option value="lifo">LIFO</option>
                </select>
            </label>
            

            <Table columns={resultTable} viewFails={viewFails}/>

            <div className='fails'
                onMouseEnter={() => setViewFails(true)}
                onClick={() => setViewFails(!viewFails)}
                onMouseLeave={() => setViewFails(false)}
            ><span>{falhas.filter(f => {return f}).length}</span> Falhas</div>
        </div>
    )
}

export default Result;