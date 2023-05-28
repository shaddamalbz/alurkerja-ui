import { useState, FC, useEffect } from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

interface Wysiwyg {
  onChange?: (value: string) => void
}

const Wysiwyg: FC<Wysiwyg> = ({ onChange }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState)
  }

  useEffect(() => {
    onChange?.(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }, [editorState])

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
