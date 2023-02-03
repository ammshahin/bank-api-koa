exports.responseHandler = async (ctx, next) => {
  ctx.response.ok = data => {
    ctx.status = 200;
    ctx.body = data;
    return;
  };
  ctx.response.badRequest = error => {
    ctx.status = error.status ? error.status : 400;
    ctx.body = error;
    return;
  };
  ctx.response.unauthorize = error => {
    ctx.status = 401;
    ctx.body = error;
    return;
  };
  return next();
};
