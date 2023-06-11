import Button from "../Button/button";


export default function PopupConfirmation({ confirm, cancel }) {
  return(
    <div className="absolute top-[72px] left-1/2 -translate-x-1/2 w-96 p-6 bg-white border rounded drop-shadow z-10">
      <h3>Are you sure want to delete this product ?</h3>
      <div className="relative flex flex-row flex-nowrap gap-8 justify-center items-center">
        <Button
          text={'Cancel'}
          typeColor={'secondary'}
          onClick={cancel}
        />
        <Button
          text={'Confirm'}
          typeColor={'primary'}
          onClick={confirm}
        />
      </div>
    </div>
  )
}