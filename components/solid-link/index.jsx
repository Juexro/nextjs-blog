import React from 'react';
import { classNames } from '@/utils';

export default function SolidLink(props) {
  const { className, ...rest } = props;
  return (
    <a target="_blank" {...rest} className={classNames(['link', className])}></a>
  )
}