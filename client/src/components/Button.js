import PropTypes from 'prop-types'

const Button = ({ bColor, textColor, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: bColor, color: textColor }}
      className='btn'
    >
      {text}
    </button>
  )
}

Button.defaultProps = {
  color: 'teal',
}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button