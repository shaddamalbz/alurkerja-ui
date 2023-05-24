import { FC } from 'react'
import { FaFileImage, FaTrash } from 'react-icons/fa'
import { File } from '@/types'
import { toKiloByte } from '@/utils'

const CardFile: FC<{
  data: File[]
  onClickDelete?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, file: File) => void
  readonly?: boolean
}> = ({ data, onClickDelete, readonly }) => {
  return (
    <div className="border-2 border-b-0 border-gray-200 rounded text-gray-600">
      {data &&
        data.map((file: any, index: number) => (
          <div className="flex items-center justify-between p-2 border-b-2" key={index}>
            <div className="flex items-center gap-x-2">
              <FaFileImage /> <span>{file.name}</span>
            </div>
            <div className="flex items-center gap-x-2">
              <span>{toKiloByte(file.size, 'byte')}KB</span>
              {!readonly && (
                <button onClick={(e) => onClickDelete?.(e, file)}>
                  <FaTrash />
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  )
}

export default CardFile
