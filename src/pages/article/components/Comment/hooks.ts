import { useLogin } from '@/hooks/useLogin';

// 部分业务抽取
export const useCommentItemEvent = (userId: number) => {
  const [isLogin, localUserInfo] = useLogin();
  if (isLogin) {
    const isShowDelete = userId === (localUserInfo as any).id;
    return [isLogin, isShowDelete];
  } else {
    return [isLogin, false];
  }
};
