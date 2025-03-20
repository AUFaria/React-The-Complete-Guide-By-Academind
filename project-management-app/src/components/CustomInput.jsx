export default function CustomInput({ ref, label, type }) {
 return (
  <div className="flex flex-col w-1/2 my-4">
   <label className="uppercase text-stone-500 font-medium">{label}</label>
   {type != "textarea" && (
    <input
     ref={ref}
     type={type}
     className="border-b-4 border-b-zinc-500 bg-zinc-300 h-8 p-4"
    />
   )}
   {type == "textarea" && (
    <textarea
     ref={ref}
     type={type}
     rows={3}
     className="border-b-4 border-b-zinc-500 bg-zinc-300 p-4"
    />
   )}
  </div>
 );
}
