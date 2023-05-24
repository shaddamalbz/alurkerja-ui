import { FC } from 'react'
import { FaTrash } from 'react-icons/fa'
import { File } from '@/types'

const CardFile: FC<{
  data: File[]
  onClickDelete?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, file: File) => void
  readonly?: boolean
}> = ({ data, onClickDelete, readonly }) => {
  return (
    <figure className="grid grid-cols-4 gap-2">
      {data &&
        data.map((image: any, index: number) => {
          return (
            <div className="relative h-fit" key={index} onClick={(e) => onClickDelete?.(e, image)}>
              {!readonly && (
                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/50 z-10 cursor-pointer rounded-lg">
                  <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-white z-20">
                    <FaTrash />
                  </div>
                </div>
              )}

              <img className="rounded-lg" src={image.original_url} alt={image.name} />
            </div>
          )
        })}
    </figure>
  )
}

export default CardFile
