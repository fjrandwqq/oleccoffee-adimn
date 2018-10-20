/**
 * Description 全局过滤器
 * @authors fanjiongrong (fanjiongrong@tvflnet.com)
 * @date    2018-07-17 09:25:43
 * @version 1.0.0
 */

const filterEmpty = value => {
  if (value === null || value === '') {
    return '-'
  }
  return value
}
export { filterEmpty }
