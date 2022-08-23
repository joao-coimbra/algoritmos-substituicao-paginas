import { useState } from 'react';
import './App.scss';

// import Slider from './components/Slider';

function App() {

    const [seq, setSeq] = useState(['']);

    return (
        <div className="App">
            <div className="container">
                {seq.map((value, index) => (
                    <input key={index} type='number'
                        onFocus={e => {
                            
                        }}
                        onKeyDown={e => {
                            if(e.code === "Backspace") {
                                seq.pop()
                                setSeq([...seq])
                                e.preventDefault()
                            }
                        }}
                        onChange={e => {
                            seq[index] = e.target.value;
                            seq.push('')
                            setSeq([...seq])
                            // let parentNode = e.target.parentNode.children;
                            // parentNode[parentNode.length-1].focus()
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
