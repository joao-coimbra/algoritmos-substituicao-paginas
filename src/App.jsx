import { useState, useEffect } from 'react';
import './App.scss';

// import Slider from './components/Slider';
import SetSequence from './components/SetSequence';
import Result from './components/Result';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

function App() {

    const [seq, setSeq] = useState(['']);
    const [quadros, setQuadros] = useState(3);
    const [resultArr, setResultArr] = useState([]);

    const [falhas, setFalhas] = useState([]);

    const [method, setMethod] = useState('fifo')

    // console.log(method)

    useEffect(() => {
        let a = [...seq]
        a.pop()
        let result = []
        let valuesCount = []
        let fail = [];
        let newseq = [...seq]
        switch (method) {
            case 'fifo':
                for (let x in a) {
                    let value = a[x];
                    let index = parseInt(x);
                    if (!index) {
                        result.push([value, ...Array(quadros - 1).fill(null)])
                        valuesCount.push(value)
                        fail.push(true)
                    } else {
                        if (result[index - 1].includes(value)) {
                            fail.push(false)
                            result.push(result[index - 1])
                            // for(let i = 0; i < quadros; i++) {
                            //     if(!!result[index-1][i]) {
                            //         valuesCount[result[index-1][i]] = (valuesCount[result[index-1][i]] || 0) + 1
                            //     }
                            // }
                        } else {
                            fail.push(true)
                            if (result[index - 1].includes(null)) {
                                result.push([...result[index - 1]])
                                result[index].splice(result[index - 1].indexOf(null), 1, value)
                                valuesCount.push(value)
                            } else {
                                result.push([...result[index - 1]])
                                result[index].splice(result[index - 1].indexOf(valuesCount[0]), 1, value)
                                valuesCount.shift();
                                valuesCount.push(value);
                            }
                        }
                    }
                }
                break;
            case 'optimal':
                for (let x in a) {
                    let value = a[x];
                    let index = parseInt(x);
                    if (!index) {
                        result.push([value, ...Array(quadros - 1).fill(null)]);
                        fail.push(true);
                    } else {
                        if (result[index - 1].includes(value)) {
                            fail.push(false);
                            result.push(result[index - 1]);
                            // for(let i = 0; i < quadros; i++) {
                            //     if(!!result[index-1][i]) {
                            //         valuesCount[result[index-1][i]] = (valuesCount[result[index-1][i]] || 0) + 1
                            //     }
                            // }
                            // console.log(valuesCount)
                        } else {
                            fail.push(true)
                            if (result[index - 1].includes(null)) {
                                valuesCount.push(value)
                                result.push([...result[index - 1]])
                                result[index].splice(result[index - 1].indexOf(null), 1, value)
                            } else {
                                result.push([...result[index - 1]])
                                    // let query;
                                let indexqmax = 0;
                                let indexq;
                                let page;

                                for(let b in result[index - 1]) {
                                    indexq = newseq.indexOf(result[index - 1][b])
                                    // console.log(result[index - 1])
                                    // console.log(indexq)
                                    // console.log(indexq)
                                    if(indexq < 0) {
                                        result[index].splice(b, 1, value)
                                        break;
                                    } else {
                                        if(indexq > indexqmax) {
                                            indexqmax = indexq;
                                            page = result[index - 1][b]
                                        }
                                        // query = 
                                        // result[index].splice(b, 1, value)
                                    }
                                }

                                if(indexq >= 0) {
                                    result[index].splice(result[index - 1].indexOf(page), 1, value)
                                }
                            }
                        }
                    }
                    
                    newseq = [...seq].slice(index+1)
                    // console.log(newseq)
                }
                break;
            case 'lru':
                for (let x in a) {
                    let value = a[x];
                    let index = parseInt(x);
                    if (!index) {
                        result.push([value, ...Array(quadros - 1).fill(null)]);
                        fail.push(true);
                        valuesCount.push(value);
                    } else {
                        if (result[index - 1].includes(value)) {
                            fail.push(false);
                            result.push(result[index - 1]);
                            valuesCount.splice(valuesCount.indexOf(value), 1);
                            valuesCount.push(value);
                            // for(let i = 0; i < quadros; i++) {
                            //     if(!!result[index-1][i]) {
                            //         valuesCount[result[index-1][i]] = (valuesCount[result[index-1][i]] || 0) + 1
                            //     }
                            // }
                        } else {
                            fail.push(true)
                            if (result[index - 1].includes(null)) {
                                valuesCount.push(value)
                                result.push([...result[index - 1]])
                                result[index].splice(result[index - 1].indexOf(null), 1, value)
                            } else {
                                result.push([...result[index - 1]])
                                result[index].splice(result[index - 1].indexOf(valuesCount[0]), 1, value)
                                valuesCount.shift();
                                valuesCount.push(value);
                            }
                        }
                    }
                }
                break;
            case 'lifo':
                let lastPage;
                for (let x in a) {
                    let value = a[x];
                    let index = parseInt(x);
                    if (!index) {
                        result.push([value, ...Array(quadros - 1).fill(null)])
                        valuesCount.push(value)
                        fail.push(true)
                    } else {
                        if (result[index - 1].includes(value)) {
                            fail.push(false)
                            result.push(result[index - 1])
                            lastPage = value;
                            // for(let i = 0; i < quadros; i++) {
                            //     if(!!result[index-1][i]) {
                            //         valuesCount[result[index-1][i]] = (valuesCount[result[index-1][i]] || 0) + 1
                            //     }
                            // }
                        } else {
                            fail.push(true)
                            if (result[index - 1].includes(null)) {
                                result.push([...result[index - 1]])
                                result[index].splice(result[index - 1].indexOf(null), 1, value)
                                valuesCount.push(value)
                            } else {
                                result.push([...result[index - 1]])
                                result[index].splice(result[index - 1].indexOf(lastPage), 1, value)
                                // valuesCount.pop();
                                // valuesCount.unshift(value);
                                lastPage = value;
                            }
                        }
                    }
                }
                break;

            default:
                break;
        }

        // console.log(valuesCount)
        // console.log(result)
        setFalhas(fail);
        setResultArr(result);
    }, [method, seq, quadros])

    return (
        <div className="App">
            <div className="container">
                <div className="title">
                    <h1>Gerenciamento de mem??ria</h1>
                    <h2>Algor??tmos de substituicao de p??ginas</h2>
                </div>
                <SetSequence seq={seq} setSeq={value => setSeq(value)} />
                <div className="set-quantity">
                    <h3>N??mero de quadros</h3>
                    <div>
                        <button
                            onClick={() => {
                                quadros > 1 && setQuadros(parseInt(quadros) - 1)
                            }}
                        ><AiOutlineMinus /></button>
                        <input style={{ width: quadros.toString().length + 'ch' }} type="number" value={quadros} min='1'
                            disabled
                            // onChange={e => {
                            //     if ((parseInt(e.target.value) <= 50 && parseInt(e.target.value) >= 1) || !e.target.value) {
                            //         setQuadros(e.target.value)
                            //     } else if (parseInt(e.target.value) < 1) {
                            //         setQuadros(1)
                            //     } else if (parseInt(e.target.value) > 10) {
                            //         setQuadros(10)
                            //     }
                            // }}
                            // onBlur={e => {
                            //     !e.target.value && setQuadros(1);
                            // }}
                        />
                        <button
                            onClick={() => {
                                if (!(parseInt(quadros) + 1 > 10)) {
                                    setQuadros(parseInt(quadros) + 1)
                                }
                            }}
                        ><AiOutlinePlus /></button>
                    </div>
                </div>
                <Result
                    setMethod={method => setMethod(method)}
                    seq={seq}
                    quadros={quadros}
                    result={resultArr}
                    falhas={falhas}
                />
            </div>
        </div>
    );
}

export default App;
