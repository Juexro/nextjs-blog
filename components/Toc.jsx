import React, { useEffect, useState } from 'react';

export default function Toc(props) {
  const { data } = props;
  const [tree, setTree] = useState([]);

  useEffect(() => {
    const result = [];
    let depth = 0;
    const findDeepResult = (toc, depth) => {
      depth--;
      if (depth === 0) {
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
        <div>{toc.content}</div>
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
    <div>
      {
        tree.map(item => renderToc(item))
      }
    </div>
  )
}