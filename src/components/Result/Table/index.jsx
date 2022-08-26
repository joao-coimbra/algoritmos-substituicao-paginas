import './styles.scss'

function Table({ collums, viewFails }) {

    // console.log(collums)

    return(
        <div className="h-table">
            <div className='content'>
                {collums.map((collumn, index) => (
                    
                    <div key={index} className={(collumn.fail && viewFails) ? 'fail' : ''}
                        title={collumn.quadros.filter((este, i) => collumn.quadros.indexOf(este) === i).filter(arr => !arr).length
                                    ? collumn.seq
                                        ? `Página ${collumn.seq} já está na memória`
                                        : null
                                    : `Página ${collumn.seq} substitui a posição ${(parseInt(collumn.quadros.indexOf(collumn.seq))+1)} `}
                    >
                        <div>{collumn.seq}</div>
                        {collumn.quadros.map((quadro, index) => (
                            <div key={index}
                                className={(quadro === collumn.seq) ? 'focus' : ''}
                            >{quadro}</div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Table;