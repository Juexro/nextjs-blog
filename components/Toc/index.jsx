import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { classNames } from '@/utils';

export default function Toc(props) {
  const { data, onAnchorClick, className, ...attrs } = props;
  const [tree, setTree] = useState([]);

  useEffect(() => {
    const result = [];
    let depth = 0;
    const findDeepResult = (toc, depth) => {
      depth--;
      if (depth <= 0) {
        return toc;
      } else {
        return findDeepResult(toc.children.slice(-1)[0], depth);
      }
    };
    data.forEach((item, index) => {
      if (index === 0 || item.lvl < data[index - 1].lvl) {
        depth = 0;
        result.push({
          ...item,
          depth,
          children: []
        });
      } else if (item.lvl === data[index - 1].lvl) {
        const deepResult = findDeepResult(result.slice(-1)[0], depth);
        deepResult.children.push({
          ...item,
          depth,
          children: []
        });
      } else {
        depth++;
        const deepResult = findDeepResult(result.slice(-1)[0], depth);
        deepResult.children.push({
          ...item,
          depth,
          children: []
        });
      }
    });
    setTree(result);
  }, [data]);

  const renderToc = (toc) => {
    return (
      <div key={toc.i} style={{marginLeft: toc.depth * 10 + 'px'}}>
        <div className={classNames([styles.anchor, 'hover'])} onClick={() => { onAnchorClick && onAnchorClick(toc) }}>{toc.content}</div>
        {
          toc.children.length > 0 && (
            <div>
              {
                toc.children.map(item => {
                  return renderToc(item);
                })
              }
            </div>
          )
        }
      </div>
    )
  }

  return (
    <aside {...attrs} className={classNames([styles.container, className])}>
      {
        tree.map(item => renderToc(item))
      }
    </aside>
  )
}