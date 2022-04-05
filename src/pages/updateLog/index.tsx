/*
 * @Date: 2022-03-13 18:30:49
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-05 15:34:53
 */
import React, { memo, useMemo } from 'react';

export default memo(function index() {
  //props/state
  const [countArr, setCountArr] = React.useState([
    {
      count: 1,
    },
  ]);

  //redux hooks

  //other hooks
  const changeArr = (arr) => {
    console.log(arr);
    return arr.map((item) => {
      return {
        count: item.count + 1,
      };
    });
  };

  //其他逻辑
  const memoArr = useMemo(() => changeArr(countArr), [countArr]);
  console.log(memoArr);
  return (
    <div
      onClick={() =>
        (function () {
          setTimeout(() => {
            setCountArr([
              {
                count: 3,
              },
              {
                count: 11,
              },
            ]);
          }, 3000);
        })()
      }
    >
      111{countArr.length}
      {countArr.length &&
        memoArr.map((item) => {
          return <div>{item.count}</div>;
        })}
    </div>
  );
});
