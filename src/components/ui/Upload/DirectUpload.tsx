import React, { FC, useContext, useEffect, useState } from 'react'
import { FaTrash, FaFileImage, FaUpload } from 'react-icons/fa'
import { FileUploader } from 'react-drag-drop-files'
import _ from 'underscore'
import Swal from 'sweetalert2'

// utils
import { toKiloByte } from '@/utils'
import { AuthContext } from '@/context'

interface DirectUploadProps {
  baseUrl: string
  service: string
  type?: 'image' | 'file'
  multiple?: boolean
  allowedFileSizeInMb?: number
  allowedExtension?: string[]
  onSuccess: (res: any) => void
}

const DirectUpload: FC<DirectUploadProps> = ({
  baseUrl,
  service,
  type = 'file',
  multiple = false,
  allowedFileSizeInMb,
  allowedExtension = ['png', 'jpeg'],
  onSuccess,
}) => {
  const axiosInstance = useContext(AuthContext)

  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [uploading, setUploading] = useState<boolean>(false)
  const [info, setInfo] = useState<string>()

  useEffect(() => {
    var strings = []
    strings.push('File yang bisa di upload adalah')
    if (allowedExtension) {
      if (allowedExtension.length > 1) {
        const allowd = [...allowedExtension]
        const poped = allowd.pop()
        strings.push(allowd.join(', ') + ' dan ' + poped)
      } else {
        strings.push(allowedExtension.join(', '))
      }
    } else {
      strings.push('semua file')
    }

    if (allowedFileSizeInMb) {
      strings.push('dengan ukuran ' + allowedFileSizeInMb + ' MB')
    }
    setInfo(strings.join(' '))
  }, [allowedExtension, allowedFileSizeInMb])

  const uploadFile = (file: any, onResponse: Function) => {
    var myFormData = new FormData()
    myFormData.append('upload', file as Blob)

    setUploading(true)

    axiosInstance
      .post(baseUrl + service, myFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res: any) => {
        onResponse(res.data.data)
      })
      .finally(() => {
        setUploading(false)
      })
      .catch(() => {
        Swal.fire('Gagal Mengunggah', 'Terjadi kesalahan ketika mengunggah file', 'error')
      })
  }

  const onDrop = (acceptedImages: any[]) => {
    const fileList = acceptedImages
    if (multiple) {
      Array.from(fileList).forEach((file: any) => {
        const reader = new FileReader()
        reader.onload = () => {
          const fileSize = file.size / 1024 / 1024

          var extension = file.name.substring(file.name.lastIndexOf('.') + 1)

          if (allowedFileSizeInMb && allowedFileSizeInMb < fileSize) {
            Swal.fire('Size File Terlalu Besar', 'Size file lebih besar dari yang di perbolehkan', 'warning')
            return
          }
          if (type === 'image' || type === 'file') {
            if (allowedExtension ? allowedExtension.indexOf(extension) !== -1 : true) {
              uploadFile(file, (response: any) => {
                setUploadedFiles((prevFiles: any) => [
                  ...prevFiles,
                  {
                    ...{
                      url: response.origin_url,
                      id: response.id,
                    },
                    ...response,
                  },
                ])
              })
            } else {
              Swal.fire('Type file tidak bisa di upload', '', 'warning')
            }
          }
        }
        reader.readAsDataURL(file)
      })
    } else {
      const file: any = fileList
      const reader = new FileReader()
      reader.onload = () => {
        const fileSize = file.size / 1024 / 1024

        var extension = file.name.substring(file.name.lastIndexOf('.') + 1)

        if (allowedFileSizeInMb && allowedFileSizeInMb < fileSize) {
          Swal.fire('Size File Terlalu Besar', 'Size file lebih besar dari yang di perbolehkan', 'warning')
          return
        }
        if (type === 'image' || type === 'file') {
          if (allowedExtension ? allowedExtension.indexOf(extension) !== -1 : true) {
            uploadFile(file, (response: any) => {
              setUploadedFiles([
                {
                  ...{
                    url: response.origin_url,
                    id: response.id,
                  },
                  ...response,
                },
              ])
            })
          } else {
            Swal.fire('Type file tidak bisa di upload ' + extension, '', 'warning')
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDelete = (e: React.SyntheticEvent, file: any) => {
    e.preventDefault()

    const newImageUrls = [...uploadedFiles]
    newImageUrls.splice(newImageUrls.indexOf(file), 1)
    setUploadedFiles(newImageUrls)
  }

  const handleChange = (event: any) => {
    const fileUploaded = event
    onDrop(fileUploaded)
  }

  useEffect(() => {
    onSuccess(uploadedFiles)
  }, [uploadedFiles])

  return (
    <div>
      <input type="hidden" />

      <div className="w-full flex flex-col gap-4">
        <FileUploader handleChange={handleChange} name="file" multiple={multiple}>
          <div className="alurkerja-form w-full flex flex-col justify-center items-center cursor-pointer rounded border-2 border-gray-200 border-dashed">
            <div className="flex flex-col justify-center items-center pt-5 pb-6 gap-2">
              <FaUpload size="2em" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {uploading ? (
                  <span>Mengunggah...</span>
                ) : (
                  <span className="font-semibold">Klik untuk mengunggah, atau drag file</span>
                )}
              </p>
              {info && <small>{info}</small>}
            </div>
          </div>
        </FileUploader>
        {uploadedFiles.length > 0 && (
          <React.Fragment>
            {type === 'image' && (
              <figure className="grid grid-cols-4 gap-2">
                {uploadedFiles &&
                  uploadedFiles.map((image: any, index: number) => {
                    return (
                      <div className="relative h-fit" key={index} onClick={(e) => handleDelete(e, image)}>
                        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/50 z-10 cursor-pointer rounded-lg">
                          <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-white z-20">
                            <FaTrash />
                          </div>
                        </div>
                        <img className="rounded-lg" src={image.original_url} alt={image.name} />
                      </div>
                    )
                  })}
              </figure>
            )}
            {type === 'file' && (
              <div className="border-2 border-b-0 border-gray-200 rounded text-gray-600">
                {uploadedFiles &&
                  uploadedFiles.map((file: any, index: number) => (
                    <div className="flex items-center justify-between p-2 border-b-2" key={index}>
                      <div className="flex items-center gap-x-2">
                        <FaFileImage /> <span>{file.name}</span>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <span>{toKiloByte(file.size, 'byte')}KB</span>
                        <button onClick={(e) => handleDelete(e, file)}>
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default DirectUpload
