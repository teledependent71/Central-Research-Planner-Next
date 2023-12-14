import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'

import authorsResource from '../resources/authors'

const TestPage = (props) => {
  return (
    <>
      <div className="test-page-container">
        <Head>
          <title>test-page - Central Research Planner</title>
          <meta
            property="og:title"
            content="test-page - Central Research Planner"
          />
        </Head>
        <DataProvider
          renderSuccess={(context_pjbb5) => (
            <>
              <h1 id={context_pjbb5?.Name}>Heading</h1>
            </>
          )}
          initialData={props.contextPjbb5Prop}
          persistDataDuringLoading={true}
          key={props?.contextPjbb5Prop?.id}
        />
      </div>
      <style jsx>
        {`
          .test-page-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default TestPage

export async function getStaticProps(context) {
  try {
    const contextPjbb5Prop = await authorsResource({
      ...context?.params,
    })
    return {
      props: {
        contextPjbb5Prop: contextPjbb5Prop?.data?.[0],
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
