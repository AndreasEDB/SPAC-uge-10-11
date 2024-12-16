import DataTable, { TableColumn } from "react-data-table-component"
import { File as FileType } from "../../interfaces/File"
import { useContext, useEffect } from "react"
import { ConnectionContext } from "../../contexts/ConnectionContextProvider"

const DirListTable = () => {
  const { files, getFiles, path, setPath } = useContext(ConnectionContext)

  useEffect(() => {
    getFiles()
  }, [])

  const columns: TableColumn<FileType>[] = [
    {
      name: "Type",
      selector: (row) => (row.is_dir ? "Directory" : "File"),
      sortable: true,
    },
    {
      name: "Filename",
      selector: (row) => row.file_name,
      sortable: true,
    },
    {
      name: "Size",
      selector: (row) => row.file_size,
      sortable: true,
    },
    {
      name: "Modified",
      selector: (row) => row.last_modified.toString(),
      sortable: true,
    },
  ]

  const navigate = (row: FileType) => {
    if (row.is_dir) {
      setPath([...path, row.file_name])
    }
  }

  return (
    <DataTable
      columns={columns}
      data={files}
      onRowClicked={navigate}
    />
  )
}
export default DirListTable
