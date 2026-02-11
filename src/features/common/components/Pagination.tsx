'use client'
import { usePathname,useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';

export default function Pagination({ totalPage }: { totalPage: number }) {
      const omitFlg: boolean = totalPage >= 8;
      const params = new URLSearchParams(useSearchParams().toString());

      let currentPage: number = Number(params.get('page')) || 1;
      currentPage = currentPage>totalPage?totalPage:currentPage;
      
      params.delete('page');
      let urlParams: {[key: string]: string}= {};
      params.forEach(function(value: string, key: string) {
        urlParams[key] = value;
      });
      const otherParams: String =params.size === 0?'':'&' + params.toString();
      
      const params2 = useSearchParams().getAll;
      const currentPath: string = usePathname();

      return (
        // https://tailwindcomponents.com/component/tailwind-css-pagination-gradient
        <div className="grid min-h-[83px] w-full place-items-center rounded-lg lg:overflow-visible">
            <nav>
                <ul className="flex">

                    {
                      (function () {
                        const list: JSX.Element[] = [];
                        //左移動
                        if(currentPage === 1){
                          list.push(
                            <li key={0}>
                            <div className=
                                {`mx-1 flex h-9 w-7 lg:h-9 lg:w-9 items-center justify-center rounded-lg  border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300`}
                              aria-label="Previous">
                                <span className={`text-sm text-slate-300`}>
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                </span>
                            </div>
                            </li>
                          );
                        }else{
                          list.push(
                            <li key={0}>
                            <Link className=
                                {`mx-1 flex h-9 w-7 lg:h-9 lg:w-9 items-center justify-center rounded-lg  border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300`}
                              href={{ pathname: currentPath, query: {...urlParams, page: String(currentPage-1)} }}
                              aria-label="Previous">
                                <span className={`text-sm`}>
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg>                              </span>
                            </Link>
                            </li>
                          );
                        };

                        if(omitFlg){
                          //省略あり
                          if(currentPage <= 3){
                            for (let i: number = 1; i <= 4; i++) {
                              if(i === currentPage){
                                list.push(
                                  pagenationNumberCurrent(i,{ pathname: currentPath, query: {...urlParams, page: String(i)} })
                                );
                              } else {
                                list.push(
                                  pagenationNumber(i,{ pathname: currentPath, query: {...urlParams, page: String(i)} })
                                );
                              };
                            };
                            list.push(
                              <li key={5}><div className="cursor-default mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300" >
                                  ･･･</div></li>
                            );
                            list.push(
                              pagenationNumber(totalPage - 1,{ pathname: currentPath, query: {...urlParams, page: String(totalPage - 1)} })
                            );
                            list.push(
                              pagenationNumber(totalPage,{ pathname: currentPath, query: {...urlParams, page: String(totalPage)} })
                            );
                          } else if(currentPage > 3 && currentPage < totalPage - 2) {
                            list.push(
                              pagenationNumber(1,{ pathname: currentPath, query: {...urlParams, page: '1'} })
                            );
                            list.push(
                              <li key={2}><div className="cursor-default mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300" >
                                  ･･･</div></li>
                            );
                            list.push(
                              pagenationNumber(currentPage - 1,{ pathname: currentPath, query: {...urlParams, page: String(currentPage - 1)} })
                            );
                            list.push(
                              pagenationNumberCurrent(currentPage,{ pathname: currentPath, query: {...urlParams, page: String(currentPage)} })
                            );
                            list.push(
                              pagenationNumber(currentPage + 1,{ pathname: currentPath, query: {...urlParams, page: String(currentPage + 1)} })
                            );
                            list.push(
                              <li key={currentPage + 2}><div className="cursor-default mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300" >
                                  ･･･</div></li>
                            );
                            list.push(
                              pagenationNumber(totalPage,{ pathname: currentPath, query: {...urlParams, page: String(totalPage)} })
                            );
                          } else if(currentPage >= totalPage - 2) {
                            list.push(
                              pagenationNumber(1,{ pathname: currentPath, query: {...urlParams, page: String(1)} })
                            );
                            list.push(
                              pagenationNumber(2,{ pathname: currentPath, query: {...urlParams, page: String(2)} })
                            );
                            list.push(
                              <li key={3}><div className="cursor-default mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300" >
                                  ･･･</div></li>
                            );
                            for (let i: number = totalPage - 3; i <= totalPage; i++) {
                              if(i === currentPage){
                                list.push(
                                  pagenationNumberCurrent(i,{ pathname: currentPath, query: {...urlParams, page: String(i)} })
                                );
                              } else {
                                list.push(
                                  pagenationNumber(i,{ pathname: currentPath, query: {...urlParams, page: String(i)} })
                                );
                              };
                            };
                          };
                        } else {
                          //省略なし
                          for (let i: number = 1; i <= totalPage; i++) {
                            if(i === currentPage){
                              list.push(
                                pagenationNumberCurrent(i,{ pathname: currentPath, query: {...urlParams, page: String(i)} })
                              );
                            } else {
                              list.push(
                                pagenationNumber(i,{ pathname: currentPath, query: {...urlParams, page: String(i)} })

                              );
                            };
                          }

                        }

                        // 右移動
                        if(currentPage === totalPage){
                          list.push(
                            <li key={totalPage + 1}>
                            <div className=
                                {`mx-1 flex h-9 w-7 lg:h-9 lg:w-9 items-center justify-center rounded-lg  border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300`}
                              aria-label="Next">
                              <span className="text-sm text-slate-300">
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                              </span>
                            </div>
                            </li>
                          );
                        }else{
                          list.push(
                            <li key={totalPage + 1}>
                            <Link className=
                                {`mx-1 flex h-9 w-7 lg:h-9 lg:w-9 items-center justify-center rounded-lg  border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300`}
                              href={{ pathname: currentPath, query: {...urlParams, page: String(currentPage+1)} }}
                              aria-label="Next">
                              <span className="text-sm">
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                              </span>
                            </Link>
                            </li>
                          );
                        };

                        return <ul className="flex">{list}</ul>;
                      }())
                    }

                </ul>
            </nav>

      </div>
      )}
  

function pagenationNumberCurrent(pageNum: number, href: Url) {
  return(
    <li key={pageNum}>
    <p className="mx-1 flex h-9 w-7 lg:h-9 lg:w-9 
      items-center justify-center rounded-lg  
      bg-gradient-to-tr from-blue-800 to-teal-300 p-0 text-sm text-white shadow-md shadow-blue-500/20 transition duration-150 ease-in-out" 
    >
      {pageNum}
    </p>
    </li>
  )
};

function pagenationNumber(pageNum: number, href: Url) {
  return(
    <li key={pageNum}>
   <Link className="mx-1 flex h-9 w-7 lg:h-9 lg:w-9 items-center justify-center rounded-lg  border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300" 
    href={href}>
      {pageNum}
    </Link>
    </li>
  )
};