import { useContext, useEffect, useState } from "react"
import { ConnectionContext } from "../../../contexts/ConnectionContextProvider"
import { File } from "../../../interfaces/File"
import AceEditor from "react-ace"

import "ace-builds/src-noconflict/mode-java"
import "ace-builds/src-noconflict/theme-github"
import "ace-builds/src-noconflict/ext-language_tools"

const EditFile = ({ path, file }: { path: string[]; file: File }) => {
  const { getEditableFile, saveEditableFile } = useContext(ConnectionContext)
  const [editableFile, setEditableFile] = useState<string | null>("")

  const getFile = async () =>
    setEditableFile(await getEditableFile([...path, file.file_name]))

  const handleChange = (value: string) => console.log(value)

  useEffect(() => {
    getFile()
  }, [])

  return (
    <div className="h-full">
      <h2 className="text-2xl">{file.file_name}</h2>
      <AceEditor
        value={editableFile ?? undefined}
        mode="json"
        theme="github"
        onChange={setEditableFile}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        height="100%"
      />
    </div>
  )
}
export default EditFile
