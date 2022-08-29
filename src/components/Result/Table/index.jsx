import './styles.scss'

function Table({ columns, viewFails }) {

    // console.log(columns)

    return(
        <div className="h-table">
            <div className='content'>
                {columns.map((column, index) => (
                    
                    <div key={index} className={(column.fail && viewFails) ? 'fail' : ''}
                        title={column.quadros.filter((este, i) => column.quadros.indexOf(este) === i).filter(arr => !arr).length
                                    ? column.seq
                                        ? `Página ${column.seq} já está na memória`
                                        : null
                                    : `Página ${column.seq} substitui a posição ${(parseInt(column.quadros.indexOf(column.seq))+1)} `}
                    >
                        <div>{column.seq}</div>
                        {column.quadros.map((quadro, index) => (
                            <div key={index}
                                className={(quadro === column.seq) ? 'focus' : ''}
                            >{quadro}</div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Table;