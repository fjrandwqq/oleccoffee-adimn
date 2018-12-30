import logo from '@/images/logo.png'
import logoFold from '@/images/logo_fold.png'

const sysInfo = {
  title: '欧蕾克后台',
  logo: logo,
  logoFold: logoFold
}

const echartColors = ['#ff7f50', '#9fd7fb', '#e18cde', '#13C2C2', '#F04864', '#8543E0']

const SERVER_NAME = 'http://203.195.171.224:8188'
const IMG_PATH = `${SERVER_NAME}/publicPlatform/image/read?imageKey=`

export { sysInfo, echartColors, IMG_PATH }
