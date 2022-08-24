import { useState } from 'react';
import './App.scss';

// import Slider from './components/Slider';
import SetSequence from './components/SetSequence';
import Result from './components/Result';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

function App() {

    const [seq, setSeq] = useState(['']);
    const [quadros, setQuadros] = useState(3);

    return (
        <div className="App">
            <div className="container">
                <SetSequence seq={seq} setSeq={value => setSeq(value)} />
                <div className="set-quantity">
                    <h3>Número de quadros</h3>
                    <div>
                        <button
                            onClick={() => {
                                quadros > 1 && setQuadros(parseInt(quadros)-1) 
                            }}
                        ><AiOutlineMinus /></button>
                        <input type="number" value={quadros} min='1'
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
