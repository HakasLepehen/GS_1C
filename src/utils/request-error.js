export function resError(error) {

  let err = new Error(error);

  if (error?.response?.status === 401) {
    err.code = 401;
  }

  throw err;

}
