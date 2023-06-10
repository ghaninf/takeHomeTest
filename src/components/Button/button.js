import PropTypes from 'prop-types';

Button.propTypes = {
  icon: PropTypes.object,
  positionIcon: PropTypes.oneOf(['left', 'right']),
  text: PropTypes.string.isRequired,
  typeColor: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  onClick: PropTypes.func,
}

export default function Button(props) {
  const typeColor = {
    primary: 'text-white bg-green-500 hover:bg-green-600 active:bg-green-700',
    secondary: 'text-white bg-red-500 hover:bg-red-600 active:bg-red-700',
    tertiary: 'text-green-500 bg-white hover:border-green-600 hover:text-green-600 active:border-green-700 active:text-green-700',
  }
  const positionIcon = {
    left: 'flex-row',
    right: 'flex-row-reverse'
  }
  return(
    <button
      onClick={props?.onClick || undefined}
      className={`relative w-fit min-w-[80px] px-4 py-1.5 flex flex-nowrap gap-x-1 box-border rounded cursor-pointer border border-transparent
        ${positionIcon[props?.positionIcon] || ''} ${typeColor[props?.typeColor] || ''}`}>
      {props?.icon || null}
      {props?.text || null}
    </button>
  )
}