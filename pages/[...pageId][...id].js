import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

function Pages() {
    const router = useRouter();
    const query = router.query;
    const content = query && query['pageId][...id'] ? query['pageId][...id'] : '';

    const pageId = content?.length ? content[0] : '';
    const id = content?.length ? content[1] : '';

    // useEffect(() => {
    //   if (router?.query && router.query['pageId][...id']) {
    //     let data = router.query['pageId][...id'];

    //     console.log(data);
    //   }
    // }, [router?.query])

  return (
    <div>
        {pageId}
        {id}
    </div>
  )
}

export default Pages;
