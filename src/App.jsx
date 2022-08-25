import { useState, useEffect } from 'react';
import './App.scss';

// import Slider from './components/Slider';
import SetSequence from './components/SetSequence';
import Result from './components/Result';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

function App() {

    const [seq, setSeq] = useState(['']);
    const [quadros, setQuadros] = useState(3);

    useEffect(() => {
        let a = [...seq]
        a.pop()
        let result = []
        for(let x in a) {
            let value = a[x];
            let index = parseInt(x);
            if(!index) {
                result.push([value, ...Array(quadros-1).fill(null)])
                console.log(result)
            } else {
                if(result[index-1].includes(value)) {
                    result.push(result[index-1])
                } else {
                    if(result[index-1].includes(null)) {
                    } else result.push([4, 7, 1])
                }
            }
        }
        console.log(result);

        // a.forEach((x, index) => {
        //     if(!index) {
        //         setResult([[x, ...Array(quadros-1).fill(null)]])
        //     } else {
        //         console.log(result[index-1], x)
        //         if(result[index-1].includes(x)) {
        //             result[index] = result[index-1]
        //             setResult([...result])
        //         } else {

        //         }
        //         // console.log()
        //         // setResult([[x, '', '']])
        //     }
        // });
    }, [seq, quadros])


    return (
        <div className="App">
            <div className="container">
                <div className="title">
                    <h1>Gerenciamento de memória</h1>
                    <h2>Algorítmos de substituicao de páginas</h2>
                </div>
                <SetSequence seq={seq} setSeq={value => setSeq(value)} />
                <div className="set-quantity">
                    <h3>Número de quadros</h3>
                    <div>
                        <button
                            onClick={() => {
                                quadros > 1 && setQuadros(parseInt(quadros)-1) 
                            }}
                        ><AiOutlineMinus /></button>
                        <input style={{width: quadros.toString().length+'ch'}} type="number" value={quadros} min='1'
                            onChange={e => {
                                if((parseInt(e.target.value) <= 50 && parseInt(e.target.value) >= 1) || !e.target.value) {
                                    setQuadros(e.target.value)
                                } else if(parseInt(e.target.value) < 1) {
                                    setQuadros(1)
                                } else if(parseInt(e.target.value) > 50) {
                                    setQuadros(50)
                                }
                            }}
                            onBlur={e => {
                                !e.target.value && setQuadros(1);
                            }}
                        />
                        <button
                            onClick={() => {
                                if(!(parseInt(quadros)+1 > 50)) {
                                    setQuadros(parseInt(quadros)+1)
                                }
                            }}
                        ><AiOutlinePlus /></button>
                    </div>
                </div>
                <Result seq={seq} quadros={quadros}/>
            </div>
        </div>
    );
}

export default App;
