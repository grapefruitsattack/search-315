import singingMaster from '../../../data/singingMaster.json';
import Link from 'next/link';

export default function GetArtistJsx({ artist }: { artist: string }): JSX.Element{
  const units = singingMaster.filter(data=>data.personFlg===0);
  const idols = singingMaster.filter(data=>data.personFlg===1);
  var artistArray: { str: string, isLink: boolean }[] = [];

  while(artist.length > 0){
    console.log(artist)
    if(artist.indexOf('[') < 0){
      artistArray.push({str: artist, isLink: false});
      artist = '';
    } else if (artist.indexOf('[') === 0) {
      artistArray.push({str: artist.substring(1, artist.indexOf(']')), isLink: true});
      artist = artist.substring(artist.indexOf(']') + 1);;
    } else if (artist.indexOf('[') > 0) {
      artistArray.push({str: artist.substring(0, artist.indexOf('[')), isLink: false});
      artist = artist.substring(artist.indexOf('['));
    };
  };

  return(
    <>
      {artistArray.map((result, index) => {
        if(result.isLink){
          const linkTxt: string = singingMaster.find((data)=>data.singingInfoId=== result.str)?.singingInfoName||'';
          const personFlg: number = singingMaster.find((data)=>data.singingInfoId=== result.str)?.personFlg||0;
          const hrefTxt: string = personFlg === 0?'/unit/'+result.str:'/idol/'+result.str;
          return(                    
          <Link 
            className ="
            underline hover:text-sky-300
            "
            href={{ pathname: hrefTxt }}
            key={index}
          >
            <span>{linkTxt}</span>
          </Link>
          );
        } else {
          return(
            <>{result.str}</>
          );
        };
      })}
    </>
    )
}