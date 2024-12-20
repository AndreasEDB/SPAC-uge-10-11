import { useContext, useEffect, useState } from "react"
import { ConnectionContext } from "../../../contexts/ConnectionContextProvider"
import { File } from "../../../interfaces/File"
import AceEditor from "react-ace"

import "ace-builds/src-noconflict/mode-java"
import "ace-builds/src-noconflict/theme-github"
import "ace-builds/src-noconflict/ext-language_tools"
import { SidebarContext } from "../../../contexts/SidebarContextProvider"
import ButtonArea from "../../buttons/ButtonArea"
import ButtonTypes from "../../../interfaces/ButtonTypes"
import { ModalContext } from "../../../contexts/ModalContextProvider"

const EditFile = ({ path, file }: { path: string[]; file: File }) => {
  const { getEditableFile, saveEditableFile } = useContext(ConnectionContext)
  const { setWide, closeSidebar } = useContext(SidebarContext)
  const { setModalComponent, setModalTitle } = useContext(ModalContext)
  const [editableFile, setEditableFile] = useState<string | null>("")

  const getFile = async () =>
    setEditableFile(await getEditableFile([...path, file.file_name]))

  const handleChange = (value: string) => console.log(value)

  const handleSave = async () => {
    const saved = await saveEditableFile(
      [...path, file.file_name],
      editableFile!
    )

    if (saved) closeSidebar()
    else {
      setModalTitle("Error")
      setModalComponent(
        <div>
          <h2>Failed to save file</h2>
          <p>There was an error saving the file</p>
          <em>Sadly, the developer was too distracted to fix this...</em>
        </div>
      )
    }
  }

  useEffect(() => {
    getFile()
    setWide(true)
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
        width="100%"
      />
      <ButtonArea
        buttons={[
          ButtonTypes.Save(handleSave),
          ButtonTypes.Cancel(closeSidebar),
        ]}
      />
    </div>
  )
}
export default EditFile
