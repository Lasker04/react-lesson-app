import { IconButton } from '@/components/atoms/IconButton'
import { BackIcon } from '@/components/atoms/icons/BackIcon'
import React from 'react'

type Props = {
  clickHandler: () => void
}
export const BackIconButton = ({ clickHandler }: Props) => {
  return <IconButton icon={<BackIcon />} clickHandler={() => clickHandler()} />
}
