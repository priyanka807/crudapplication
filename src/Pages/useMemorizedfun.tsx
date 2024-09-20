import React, { useMemo } from 'react'

const useMemorizedfun = (handleSubmit) => {
    const memorizedHandlesubmit = useMemo(()=>handleSubmit,[handleSubmit])
  return memorizedHandlesubmit
}

export default useMemorizedfun;