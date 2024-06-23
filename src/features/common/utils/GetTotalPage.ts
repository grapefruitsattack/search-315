
import { redirect } from 'next/navigation'
import { useEffect } from 'react';
import { useParams,useSearchParams,  } from 'next/navigation'

export default function GetTotalPage
(paramPage: number, contentsLength: number, redirectRoot: string, maxCon: number )
{
    const totalPage: number = Math.ceil((contentsLength) / maxCon);
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());

    return totalPage;
}