import DataTable, { TableColumn } from "react-data-table-component"
import { File as FileType } from "../../interfaces/File"
import { createElement, useContext, useEffect, useRef } from "react"
import { ConnectionContext } from "../../contexts/ConnectionContextProvider"

const DirListTable = () => {
  const { files, getFiles, path, setPath, downloadFile } =
    useContext(ConnectionContext)
  const downloadRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    getFiles()
  }, [])

  const columns: TableColumn<FileType>[] = [
    {
      name: "Type",
      selector: row => (row.is_dir ? "Directory" : "File"),
      sortable: true,
    },
    {
      name: "Filename",
      selector: row => row.file_name,
      sortable: true,
    },
    {
      name: "Size",
      selector: row => row.file_size,
      sortable: true,
    },
    {
      name: "Modified",
      selector: row => row.last_modified.toString(),
      sortable: true,
    },
  ]

  const handleClick = async (row: FileType) => {
    if (row.is_dir) {
      setPath([...path, row.file_name])
    } else {
      const url = await downloadFile([...path, row.file_name])

      downloadRef.current!.href = url
      downloadRef.current!.download = row.file_name

      downloadRef.current!.click()
    }
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={files}
        onRowClicked={handleClick}
      />
      <a
        ref={downloadRef}
        className="hidden"
        target="_blank"
      ></a>
    </>
  )
}
export default DirListTable
