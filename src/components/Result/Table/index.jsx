import './styles.scss'

function Table({ collums }) {

    console.log(collums)

    return(
        <div className="h-table">
            <div className='content'>
                {collums.map((collumn, index) => (
                    <div key={index}>
                        <div>{collumn.seq}</div>
                        {collumn.quadros.map((quadro, index) => (
                            <div key={index}>{quadro}</div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Table;