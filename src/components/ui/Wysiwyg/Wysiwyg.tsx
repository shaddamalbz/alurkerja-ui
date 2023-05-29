import { useState, FC, useEffect } from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { Editor } from 'react-draft-wysiwyg'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

interface Wysiwyg {
  onChange?: (value: string) => void
  defaultValue?: string
}

const Wysiwyg: FC<Wysiwyg> = ({ onChange, defaultValue }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState)
  }

  useEffect(() => {
    onChange?.(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }, [editorState])

  useEffect(() => {
    if (defaultValue) {
      const contentBlock = htmlToDraft(defaultValue)
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
        const editorState = EditorState.createWithContent(contentState)
        setEditorState(editorState)
      }
    }
  }, [defaultValue])

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="border border-gray-200"
      editorClassName="px-4 min-h-[100px]"
      onEditorStateChange={onEditorStateChange}
    />
  )
}

export default Wysiwyg
