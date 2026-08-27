export default function Loading() {
    return (
    <div className="flex w-full h-full">
      <div className='flex w-fit h-fit mx-auto mt-24
        font-black text-2xl text-gray-400
        animate-pulse'
      >
        {'Loading...'}
      </div>
    </div>
    )
  }