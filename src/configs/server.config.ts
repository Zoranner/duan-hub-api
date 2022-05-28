export const ServerConfig = {
  secretKey: `${process.env.SECRET_KEY}`,
  expiresIn: '8h',
  weChatWebHookApi: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send',
};
