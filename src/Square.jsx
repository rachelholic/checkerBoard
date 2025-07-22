function Square(props) {
    const { value, index, onClick } = props;
    return (
        <div className="square" onClick={() => onClick(index)} >{ value }</div>
    );
}

export default Square;