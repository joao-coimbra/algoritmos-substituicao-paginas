import './styles.scss'

function Table({ collums, viewFails }) {

    // console.log(collums)

    return(
        <div className="h-table">
            <div className='content'>
                {collums.map((collumn, index) => (
                    <div key={index} className={(collumn.fail && viewFails) ? 'fail' : ''}>
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