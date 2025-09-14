
export default function Mypage(){
  return(
    <section className="mb-4">
      <div 
        className="
          flex items-center w-fit pl-1 ml-2 
          bg-teal-500 rounded
          text-2xl font-mono
          text-white 
          gap-2"
      >
        {/* Google Fonts Icons */}
        <svg className="fill-teal-500 bg-white rounded px-[0.5px]" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="100 -860 760 760" width="24px">
          <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
        </svg>
        <p className="pr-2">
          {'マイページ'}
        </p>
      </div>
    </section>
  )
}