

//   setRoute(path, handlerFunction) {
//     // 当调用 setRoute 方法时，
//     // 传递给 handlerFunction 的 req 和 res 参数会被传递给 handler 函数，
//     const handler = async (req, res) => {
//       // IP 过滤
//       const requestClientIp = getClientIp(req);
//       if (!requestClientIp) {
//         return FORBIDDEN_ERROR_CODE;
//       }
//       const event = req.body;
//       let result;
//       try {
//         // const startTime = new Date().getTime();
//         let params;
//         if (event.file) {
//           let eventCopy = { ...event };
//           eventCopy.file = undefined;
//           params = JSON.stringify(eventCopy);
//         } else {
//           params = JSON.stringify(event);
//         }
//         // console.log(
//         //   `req start path = ${req.path}, clientIp = ${requestClientIp}, params = ${params}`
//         // );
//         result = await handlerFunction(event, req, res);
//         // 封装响应
//         result = {
//           code: 0,
//           data: result,
//         };
//         // console.log(
//         //   `req end path = ${
//         //     req.path
//         //   }, clientIp = ${requestClientIp}, params = ${params}, costTime = ${
//         //     new Date().getTime() - startTime
//         //   }`
//         // );
//       } catch (e) {
//         // 全局异常处理
//         if (e instanceof MyError) {
//           result = {
//             code: e.code,
//             message: e.message,
//             data: null,
//           };
//         } else {
//           result = {
//             code: 500,
//             data: null,
//             message: "server error",
//           };
//         }
//         // console.error(
//         //   `req error path = ${
//         //     req.path
//         //   }, clientIp = ${requestClientIp}, params = ${JSON.stringify(event)}`,
//         //   e
//         // );
//       }
//       res.send(result);
//     };
//     // 所有路由都将以 "/api" 开头。例如，如果有一个路由定义为 /users，
//     // 那么在实际请求时，它将匹配到 /api/users 而不是只是 /users。
//     // 这样就和baseURL对应起来
//     this.app.post(this.contextPath + path, handler);
//   }

//   function getClientIp(req) {
//     if (!req) return "";
//     return (
//       req.headers["x-forwarded-for"] ||
//       req.connection?.remoteAddress ||
//       req.socket?.remoteAddress ||
//       req.connection?.socket?.remoteAddress ||
//       req.ip
//     );
//   }