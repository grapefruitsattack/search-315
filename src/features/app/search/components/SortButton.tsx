'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

const options = [
    { value: "desc", label: "リリース日新しい順" },
    { value: "asc", label: "リリース日古い順" },
  ];

export default function SortButton(
    {  }
    : {  })
{
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const currentPath: string = usePathname();
    const order :string = searchParams.get('order') || 'desc';


    return (
        <div className={`relative flex w-[400px] p-1 border border-teal-200 rounded-full`}>
                    <span className={`absolute inset-0 m-1 pointer-events-none`}>
                        <span className={`absolute inset-0 w-1/2 bg-teal-400 rounded-full shadow-sm shadow-indigo-950/10 transform transition-transform duration-150 ease-in-out 
                        ${order==="desc"?'translate-x-0':'translate-x-full'}`}></span>
                    </span>
                    <button 
                        className={`relative flex-1 text-sm font-medium h-6 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150 ease-in-out 
                            ${order==="desc"? 'text-white' : 'text-slate-400 '}`}
                        onClick={() => {
                        params.set('order','desc');
                        params.delete('display');
                        router.push(currentPath + '?'  + params.toString());}}
                    >リリース日新しい順
                    <span className={`${order==="desc"? 'text-indigo-200' : 'text-slate-400 '}`}></span>
                    </button>
                    <button 
                        className={`relative flex-1 text-sm font-medium h-6 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150 ease-in-out 
                            ${order==="desc"? 'text-slate-400 ' : 'text-white'}`}
                            onClick={() => {
                            params.set('order','asc');
                            params.delete('asc');
                            router.push(currentPath + '?'  + params.toString());}}
                    >
                    リリース日古い順</button>
        </div>
    );
}