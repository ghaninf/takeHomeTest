import PropTypes from 'prop-types';

Input.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default function Input(props) {
  return(
    <div htmlFor={props.name} className='w-full max-w-[260px] flex flex-col gap-2'>
      <label htmlFor={props.name} className='text-zinc-600 font-medium'>{props?.title}</label>
      <input
        type={props.type}
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className="w-full px-4 py-3 rounded box-border border border-zinc-300 outline-3 outline-zinc-400"
      />
      <span className='text-red-500'>{props?.error}</span>
    </div>
  )
}