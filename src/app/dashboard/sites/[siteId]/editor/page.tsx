'use client'
import { useState } from 'react'
import { Kanit } from 'next/font/google'
import AiSidebar from '@/components/editor/AiSidebar'
import PreviewPane from '@/components/editor/PreviewPane'

export default function Editor() {
  const [html, setHtml] = useState('<h1>Hello</h1>')

  return (
    <div className="grid grid-cols-4 h-full">
      <AiSidebar className="col-span-1 border-r" onChange={setHtml} />
      <PreviewPane className="col-span-3" html={html} />
    </div>
  )
}
