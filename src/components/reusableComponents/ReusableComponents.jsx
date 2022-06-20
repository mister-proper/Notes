import '../reusableComponents/reusableComponents.scss';

const Color = (props) => {
    return (
        <div {...props} style={{backgroundColor: props.color, borderRadius: '50%'}}>
        </div>
    )
}

const Button = (props) => {
    return (
        <button {...props}>
        </button>
    )
}

export {Button, Color};