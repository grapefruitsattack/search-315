import { usePathname } from "next/navigation"
import urlJoin from "proper-url-join"
import React from "react"

const useBuildId = () => {
    const basePath = usePathname()

    const shouldReload = React.useCallback((): boolean => {
        if (process.env.NODE_ENV != "production") {
        return false
        };
    
    const querySelector = document.querySelector("#__NEXT_DATA__");

    const buildId = JSON.parse(
        querySelector===null
        ?''
        :querySelector.textContent||''
    ).buildId

    const request = new XMLHttpRequest()
    request.open(
      "HEAD",
      urlJoin(basePath, `/_next/static/${buildId}/_buildManifest.js`),
      false
    )
    request.setRequestHeader("Pragma", "no-cache")
    request.setRequestHeader("Cache-Control", "no-cache")
    request.setRequestHeader(
      "If-Modified-Since",
      "Thu, 01 Jun 1970 00:00:00 GMT"
    )
    request.send(null)

    return request.status === 404
  }, [basePath])

  return {
    shouldReload,
  }
}

export default useBuildId
