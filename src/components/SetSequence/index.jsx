import './styles.scss';

function SetSequence({ seq, setSeq }) {

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    return (
        <div className="set-sequence">
            <h3>Definir sequência</h3>
            <div>
                {seq.map((value, index) => (
                    <input key={index} type='number' value={value}
                        onFocus={e => {
                        }}
                        onBlur={e => {
                            // console.log(e.target.value.length)
                            // if(!!e.target.value.length) {
                            e.target.disabled = true;
                            // }
                        }}
                        onKeyDown={async e => {
                            // console.log(e)
                            let parentNode = e.target.parentNode;

                            if (e.code === 'KeyV' && (e.ctrlKey || e.metaKey)) {
                                e.preventDefault()
                                navigator.clipboard.readText().then(async res => {
                                    if (!isNaN(res)) {
                                        setSeq([...res.split(''), ''])
                                        await sleep(1);
                                        // console.log(typeof parentNode.children)
                                        // console.log()
                                        Object.values(parentNode.children).map(input => input.disabled = true)
                                        parentNode.children[parentNode.children.length - 1].disabled = false;
                                        parentNode.children[parentNode.children.length - 1].focus();
                                    }
                                })
                            }

                            if (e.code === "Backspace" && parentNode.children.length !== 1) {
                                if (!e.target.value.length) {
                                    seq.splice(parentNode.children.length - 2, 1)
                                } else {
                                    seq.splice(index, 1)
                                }
                                setSeq([...seq])
                                parentNode.children[parentNode.children.length - 2].disabled = false;
                                parentNode.children[parentNode.children.length - 2].focus();
                                e.preventDefault()
                            } else if (e.code === "ArrowLeft") {
                                try {
                                    parentNode.children[index - 1].disabled = false;
                                    parentNode.children[index - 1].focus();
                                } catch {
                                    return false
                                }

                            } else if (e.code === "ArrowRight") {
                                try {
                                    parentNode.children[index + 1].disabled = false;
                                    parentNode.children[index + 1].focus();
                                } catch {
                                    return false
                                }
                            } else if (['NumpadAdd', 'NumpadSubtract', 'Period', 'KeyE'].includes(e.code)) {
                                e.preventDefault()
                            }
                        }}
                        onClick={e => {
                            e.target.disabled = false;
                            e.target.focus();
                        }}
                        onChange={async e => {
                            let parentNode = e.target.parentNode;
                            seq[index] = e.target.value[e.target.value.length - 1] || ''
                            if (e.target.value.length > 1) {
                                setSeq([...seq]);
                                parentNode.children[parentNode.children.length - 1].disabled = false
                            } else setSeq([...seq, '']);
                            e.target.disabled = true;
                            await sleep(1);
                            parentNode.children[parentNode.children.length - 1].focus();
                        }}
                    />
                ))}
            </div>

        </div>

    )
}

export default SetSequence;