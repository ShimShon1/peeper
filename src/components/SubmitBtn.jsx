export default function SubmitBtn(props) {
  return (
    <button className="p-1 px-[14px] text-xl bg-emerald-600 text-white rounded-full hover:bg-emerald-800">
      {props.content}
    </button>
  );
}
