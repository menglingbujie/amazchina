/**
 * Created by menglj on 2018-06-07.
 */

export const isValid = (state) => {
  const uinfo = state.userInfo;
  // uid存在并且状态为1（可用）0表示非法用户
  return !!uinfo.id&&uinfo.status==1;
};

export const userInfo = (state)=>{
  return state.userInfo;
}
