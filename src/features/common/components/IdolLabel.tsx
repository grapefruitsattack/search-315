import singingMaster from '../../../data/singingMaster.json';


export default function CreateIdolLabel({ singingInfoId }: { singingInfoId: string }): JSX.Element{
    const name = singingMaster.find(data => data.singingInfoId === singingInfoId)?.singingInfoName||'';
    const unitId: string 
        = singingMaster.find(
            data=>data.personFlg===0 && data.singingInfoId.substring(0, 3)===singingInfoId.substring(0, 3))?.singingInfoId || '';
    const color 
        = singingMaster.find(
            data=>data.personFlg===0 && data.singingInfoId.substring(0, 3)===singingInfoId.substring(0, 3))?.color;
    const colorStr:string = color ===undefined ?'' : color;

    return(<div className={`justify-center border-[3.5px] rounded-full p-1 border-`+unitId}>
        <p className={``}>{name}</p>
        
        </div>)
}