import React, { FC, useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaUpload, FaTrash, FaFileImage } from 'react-icons/fa'

// utils
import { toKiloByte } from '@/utils'

interface PendingUploadProps {
  type?: 'file' | 'image'
  allowedExtension?: string[]
  /** return change as a file */
  asFile?: boolean
  multiple?: boolean
  onChange?: (file: any) => void
}

const PendingUpload: FC<PendingUploadProps> = ({
  type = 'file',
  allowedExtension = ['png', 'jpeg'],
  asFile = false,
  multiple,
  onChange,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<any>([])
  const [files, setFiles] = useState<any>([])

  const parsedAllowExtension = (list: string[]) => {
    const fileType: { [x: string]: string[] } = {}

    list.forEach((ext) => {
      if (ext === 'png') {
        fileType['image/png'] = []
      } else if (['jpeg', 'jpg'].includes(ext)) {
        fileType['image/jpeg'] = [`.${ext}`]
      } else if (ext === 'pdf') {
        fileType['application/pdf'] = []
      } else if (ext === 'doc') {
        fileType['application/msword'] = []
      } else if (ext === 'docx') {
        fileType['application/vnd.openxmlformats-officedocument.wordprocessingml.document'] = []
      }
    })
    return fileType
  }

  useEffect(() => {
    onChange?.(files)
  }, [files])

  const onDrop = useCallback(
    (acceptedImages: File[]) => {
      acceptedImages.forEach((file: File) => {
        const reader = new FileReader()
        reader.onload = () => {
          if (type === 'image') {
            const urlImage = URL.createObjectURL(file)
            const newFile = !asFile ? reader.result : file

            const newUploadedFiles = multiple ? [...uploadedFiles, urlImage] : [urlImage]
            const newFiles = multiple ? [...files, newFile] : [newFile]
            setUploadedFiles(newUploadedFiles)
            setFiles(newFiles)
          } else {
            const newUploadedFiles = multiple ? [...uploadedFiles, file] : [file]
            const newFile = !asFile ? reader.result : file
            const newFiles = multiple ? [...files, newFile] : [newFile]
            setUploadedFiles(newUploadedFiles)
            setFiles(newFiles)
          }
        }
        reader.readAsDataURL(file)
      })
    },
    [uploadedFiles]
  )

  const handleDelete = (e: React.SyntheticEvent, file: any) => {
    e.preventDefault()

    const newListFile = [...files]
    newListFile.splice(newListFile.indexOf(file), 1)
    setFiles(newListFile)

    const newImageUrls = [...uploadedFiles]
    newImageUrls.splice(newImageUrls.indexOf(file), 1)
    setUploadedFiles(newImageUrls)
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: multiple || false,
    accept: parsedAllowExtension(allowedExtension),
  })

  return (
    <div className="w-full flex flex-col gap-4">
      <div
        {...getRootProps({
          className:
            'alurkerja-form w-full flex flex-col justify-center items-center cursor-pointer rounded border-2 border-gray-200 border-dashed',
        })}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col justify-center items-center pt-5 pb-6 gap-2">
          <FaUpload size="2em" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Klik untuk mengunggah, atau drag file</span>
          </p>
        </div>
      </div>

      {uploadedFiles.length !== 0 && (
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
                      <img className="rounded-lg" src={image} alt="image" />
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
  )
}

export default PendingUpload
