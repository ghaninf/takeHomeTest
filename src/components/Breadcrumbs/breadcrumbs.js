import { useRouter } from "next/navigation";

export default function Breadcrumbs({ title }) {
  const router = useRouter();
  const link = window.location.pathname.split('/')[1]
  return(
    <div className="flex flex-row flex-nowrap gap-x-4 text-zinc-500">
      <h3 onClick={() => router.push(`/${link}`)} className="capitalize cursor-pointer hover:text-zinc-800">{link}</h3>
      <h3 >{' > '}</h3>
      <h3 >{ title }</h3>
    </div>
  )
}