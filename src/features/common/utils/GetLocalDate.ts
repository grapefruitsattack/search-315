'use server'
import { cookies } from 'next/headers';

export default async function GetLocalDate() {

    const cookieStore = cookies();
    const localDate = (await cookieStore).get('localDate')?.value||'';

    console.log(localDate)
    console.log(localDate==='')
    // cookieにlocalDateが存在する場合そのまま返す
    if(localDate!==''&&localDate!==null) return localDate;

    // cookieにlocalDateが存在しない場合、日本時間を返す
    const dt = new Date();
    const serverDateArray = [
      dt.getFullYear().toString(),
      ('0' + (dt.getMonth() + 1)).slice(-2),
      ('0' + dt.getDate()).slice(-2),
    ];
    const jpDateStr: string = new Date().toLocaleString('ja-JP');
    const pattern = /[0-9]+/g;
    const array = jpDateStr.match(pattern)?.map((str)=> str)||serverDateArray;
    const jpDate = [
      array[0],
      array[1],
      array[2],
    ].join('-');
  

    console.log(dt)
    console.log(jpDate)
    return jpDateStr;
    
}