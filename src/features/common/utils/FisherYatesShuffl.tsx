export default function FisherYatesShuffl(length:number):number[] {
  const numbers: number[] = Array.from({ length: length }, (_, i) => i + 1);
  for (let i: number = length-1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers;
}