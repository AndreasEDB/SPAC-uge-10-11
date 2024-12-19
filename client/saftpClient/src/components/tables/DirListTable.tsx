import DataTable, { TableColumn } from "react-data-table-component"
import { File as FileType } from "../../interfaces/File"
import { createElement, useContext, useEffect, useRef, useState } from "react"
import { ConnectionContext } from "../../contexts/ConnectionContextProvider"
import {
  MdModeEdit,
  MdOutlineFileDownload,
  MdOutlineFolder,
} from "react-icons/md"
import { formatFileSize } from "../../assets/ts/fileHelper"
import BaseButton from "../buttons/BaseButton"
import ButtonTypes from "../../interfaces/ButtonTypes"
import { SidebarContext } from "../../contexts/SidebarContextProvider"
import EditFile from "../sidebar/sidebarComponents/EditFile"

const DirListTable = () => {
  const { files, setFiles, getFiles, path, setPath, downloadFile } =
    useContext(ConnectionContext)
  const { setSidebarComponent } = useContext(SidebarContext)
  const downloadRef = useRef<HTMLAnchorElement | null>(null)

  const [tableFiles, setTableFiles] = useState<FileType[]>([])

  useEffect(() => {
    getFiles()
  }, [])

  useEffect(() => {
    setTableFiles(files)
  }, [files])

  const sortByFileSize = (rowA: FileType, rowB: FileType): 1 | -1 | 0 => {
    // sort by file size. If the file is a directory, it should be at the top

    if (rowA.file_size > rowB.file_size) {
      return 1
    }
    if (rowA.file_size < rowB.file_size) {
      return -1
    }
    return 0
  }

  const columns: TableColumn<FileType>[] = [
    {
      cell: row => (row.is_dir ? <MdOutlineFolder /> : ""),
      sortable: true,
      width: "3rem",
    },
    {
      name: "Filename",
      cell: row => (
        <span className={row.is_dir ? "font-bold" : undefined}>
          {row.file_name}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Size",
      selector: row => formatFileSize(row.file_size),
      sortable: true,
      sortFunction: sortByFileSize,
    },
    {
      name: "Modified",
      selector: row => row.last_modified.toString(),
      sortable: true,
    },
    {
      cell: row =>
        !row.is_dir && (
          <BaseButton
            {...ButtonTypes.Download(() => download(row))}
            text=""
            icon={() => <MdOutlineFileDownload height={"100%"} />}
          />
        ),
      right: true,
      width: "3rem",
    },
    {
      cell: (row: FileType) =>
        row.editable && (
          <BaseButton
            {...ButtonTypes.Edit(() =>
              setSidebarComponent(
                <EditFile
                  path={path}
                  file={row}
                />
              )
            )}
            text=""
            icon={() => <MdModeEdit height={"100%"} />}
          />
        ),
      right: true,
      width: "3rem",
    },
  ]

  const handleRowClick = async (row: FileType) => {
    if (row.is_dir) {
      setPath([...path, row.file_name])
    }
  }

  const download = async (row: FileType) => {
    const url = await downloadFile([...path, row.file_name])

    downloadRef.current!.href = url
    downloadRef.current!.download = row.file_name

    downloadRef.current!.click()
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={tableFiles}
        dense
        onRowClicked={handleRowClick}
        onSort={(_, __, sortedRows) =>
          setTableFiles([
            ...sortedRows.filter(row => row.is_dir),
            ...sortedRows.filter(row => !row.is_dir),
          ])
        }
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
