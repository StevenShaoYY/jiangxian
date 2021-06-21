import store from '../../store';

export const GlobalInterception = (code, msg) => {
  let message = ''
  
  switch (code) {
    case -1:
      message = '内部错误'
      break
    case 100001:
      message = msg
      break
    case 100002:
      message = '页码过大'
      break
    case 100003:
      message = '文件上传失败'
      break
    case 100004:
      message = 'IMEI格式错误'
      break
    case 100101:
      message = '用户已存在'
      break
    case 100102:
      message = '邮箱或手机号已存在'
      break
    case 100103:
      message = '用户不存在'
      break
    case 100104:
      message = '密码错误'
      break
    case 100117:
      message = '用户连续5次登陆错误，被限制30分钟内不允许登陆'
      break
    case 100118:
      message = '用户不存在或密码错误'
      break
    case 100705:
      message = '文件格式不正确'
      break
    case 100105:
      message = '用户已禁用，请联系管理员'
      break
    case 100106:
      message = '邮箱或者手机号或验证信息已存在'
      break
    case 100107:
      message = '没有操作权限'
      break
    case 100108:
      message = '验证码已过期，请刷新重试'
      break
    case 100109:
      message = '验证码错误'
      break
    case 100110:
      message = '用户已认证完成'
      break
    case 100111:
      message = '用户类型与访问接口不匹配'
      break
    case 100112:
      message = '认证审核结果信息不能为空'
      break
    case 100113:
      message = 'accessKey不正确'
      break
    case 100114:
      message = 'accessKey超额（最多10个）'
      break
    case 100115:
      message = '密码格式不正确'
      break
    case 100116:
      message = ' 用户未完成实名认证'
      break
    case 100201:
      message = '产品不存在'
      break
    case 100301:
      message = '品类不存在'
      break
    case 100302:
      message = '品类级别不是叶子节点'
      break
    case 100303:
      message = '品类文件格式错误'
      break
    case 100304:
      message = '导入列表品类ID不唯一'
      break
    case 100305:
      message = '导入列表子品类ID不唯一'
      break
    case 100306:
      message = '导入列表子品类编码不唯一'
      break
    case 100307:
      message = '子品类编码或ID已存在'
      break
    case 100401:
      message = '规则不存在'
      break
    case 100402:
      message = '规则不存在'
      break
    case 100501:
      message = '配额不存在'
      break
    case 100502:
      message = '配额已存在'
      break
    case 100503:
      message = '设备配额不足'
      break
    case 100601:
      message = '脚本不存在'
      break
    case 100701:
      message = '上传文件大小限制'
      break
    case 100801:
      message = '批量大小不应该为零'
      break
    case 100802:
      message = '批量添加超出大小限制'
      break
    case 100803:
      message = '批量导入文件格式错误'
      break
    case 100804:
      message = '设备ID列表不能为空'
      break
    case 100901:
      message = '日志查询失败'
      break
    case 100902:
      message = '消息日志查询失败'
      break
    case 100903:
      message = '查询范围非法'
      break
    case 100904:
      message = '设备ID错误，只允许输入英文数字、下划线、中划线, 长度限定4-32位'
      break
    case 100905:
      message = '设备名称错误，只允许输入中英文数字、下划线、中划线、点，长度限定2-32位'
      break
    case 65535:
      message = '未知错误'
      break
    case 4000:
      message = '参数错误'
      break
    case 1001:
      message = 'JSON解析错误'
      break
    case 1002:
      message = '指令(动作)不支持'
      break
    case 1003:
      message = '设备未登录'
      break
    case 1004:
      message = '设备不存在'
      break
    case 1005:
      message = '设备登录校验失败'
      break
    case 1006:
      message = '设备不支持子设备'
      break
    case 1007:
      message = '备添加拓扑结构不允许形成环'
      break
    case 1008:
      message = '设备不在线'
      break
    case 1009:
      message = '设备被禁用'
      break
    case 1010:
      message = '设备没有这个子设备'
      break
    case 1104:
      message = '产品不存在'
      break
    case 1105:
      message = '产品不支持远程配置'
      break
    case 1106:
      message = '产品不存在'
      break
    case 1107:
      message = 'IMEI不合法'
      break
    case 1108:
      message = 'IMEI已存在'
      break
    case 1109:
      message = '规则select参数不正确'
      break
    case 1110:
      message = '规则表达式不合法'
      break
    case 1111:
      message = '规则不存在'
      break
    case 1112:
      message = '规则目标地址http不合法'
      break
    case 1113:
      message = msg
      break
    case 1114:
      message = '配额已经存在'
      break
    case 1115:
      message = '配额不存在'
      break
    case 1116:
      message = '升级任务启用冲突'
      break
    case 1117:
      message = '升级任务启用存在循环'
      break
    case 1118:
      message = '升级任务不存在'
      break
    case 1119:
      message = '没有可用的远程配置'
      break
    case 1120:
      message = '配额不足'
      break
    case 1121:
      message = '协议参数名字重复'
      break
    case 1122:
      message = '协议参数标识符重复'
      break
    case 1123:
      message = '协议命令名字符重复'
      break
    case 1124:
      message = '协议命令标识符重复'
      break
    case 1125:
      message = '设备id不合法 支持 数字，字母大小写，下划线，中划线'
      break
    case 1126:
      message = '设备id已经存在'
      break
    case 1127:
      message = '产品下还有设备，不允许删除产品'
      break
    case 1128:
      message = '子设备不允许直连'
      break
    case 1129:
      message = '设备所属网关不在线'
      break
    case 1130:
      message = '产品编解码插件（脚本）未运行，可能不存在或者编译失败'
      break
    case 1131:
      message = '产品编码插件编码错误'
      break
    case 1132:
      message = '产品编码插件解码码错误'
      break
    case 1133:
      message = '产品不支持脚本'
      break
    case 1134:
      message = '产品不支持脚本'
      break
    case 1135:
      message = '产品脚本编译失败'
      break
    case 500:
      message = '系统内部错误'
      break
    case 5001:
      const userType = store.getters.userInfo.userType
      if (userType === 'PERSONAL' || userType === 'ENTERPRISE') {
        // 普通用户
        message = '请联系管理员'
      } else {
        // 超管
        message = '证书已过期，请您更新证书。'
      }
      break
    default:
      break
  }
  return message
  // return (
  //   message &&
  //   Notification.error({
  //     title: '错误',
  //     message: message
  //   })
  // )
}