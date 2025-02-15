import React, { useEffect, useMemo, useState } from 'react'
import { OrgRoamNode } from '../api'
import { NodeByCite, NodeById } from '../pages/index'
import { ProcessedOrg } from './processOrg'

export interface UniOrgProps {
  nodeById: NodeById
  previewNode: any
  setPreviewNode: any
  nodeByCite: NodeByCite
  setSidebarHighlightedNode: any
  openContextMenu: any
}

export const UniOrg = (props: UniOrgProps) => {
  const {
    openContextMenu,
    setSidebarHighlightedNode,
    nodeById,
    nodeByCite,
    previewNode,
    setPreviewNode,
  } = props

  const [previewText, setPreviewText] = useState('')

  const file = encodeURIComponent(encodeURIComponent(previewNode.file))
  useEffect(() => {
    fetch(`http://localhost:35901/file/${file}`)
      .then((res) => {
        return res.text()
      })
      .then((res) => {
        if (res !== 'error') {
          setPreviewText(res)
        }
      })
      .catch((e) => {
        console.log(e)
        return 'Could not fetch the text for some reason, sorry!\n\n This can happen because you have an id with forward slashes (/) in it.'
      })
  }, [previewNode.id])

  return (
    <>
      {previewNode?.id && (
        <ProcessedOrg
          {...{
            nodeById,
            previewNode,
            setPreviewNode,
            previewText,
            nodeByCite,
            setSidebarHighlightedNode,
            openContextMenu,
          }}
        />
      )}
    </>
  )
}
