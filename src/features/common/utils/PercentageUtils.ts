export function GetPercentageInfo
(numerator: number, denominator: number)
:{percentageStr:string,endAngle:number}
{
    let endAngle: number = 0;
    let percentageStr: string = '0%';
    if(numerator>=denominator||denominator<=0){
      endAngle = 30;
      percentageStr = '100%';
    }else if(numerator===0){
      endAngle = 0;
      percentageStr = '0%'
    }else{
      endAngle = Math.trunc((360*numerator)/(denominator));
      const divres = Math.round((numerator*100*10)/(denominator));
      console.log(divres)
      console.log(endAngle)
      if(divres<=0){
        endAngle = 1;
        percentageStr = '0.1%';
      }else if(divres>=1000){
        endAngle = 359;
        percentageStr = '99.9%';
      }else if(divres<10){
        if(endAngle<=0) endAngle = 1;
        percentageStr = '0.'+divres.toString()+'%';
      }else if(divres<100){
        percentageStr = divres.toString().slice(0, 1)+'.'+divres.toString().slice(1, 2)+'%';
      }else if(divres>=100){
        percentageStr = divres.toString().slice(0, 2)+'.'+divres.toString().slice(2, 3)+'%';
      };
    };

    return{percentageStr,endAngle};
}