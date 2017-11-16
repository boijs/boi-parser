/**
 * @desc 可用的配置模块
 * @type {Array}
 */
const PATTERNS = [
  'basic',
  'js',
  'style',
  'html',
  'image'
];

/**
 * @desc 基础配置，包括编译和部署等相关配置
 * @type {Object}
 */
const DEFAULT_CONFIG_BASIC = {
  // 项目名称，默认值app
  appname: 'app',
  // 源码目录
  source: './src/',
  // 编译输出目录
  output: './dest/',
  // 第三方库文件目录
  libs: './libs/',
  // 是否部署libs文件，默认关闭
  deployLibs: false,
  // 性能指标
  limit: {
    // 入口文件最大不超过150kb
    maxEntrypointSize: 150000,
    // 所有类型文件最大不超过200kb
    maxAssetSize: 200000
  }
};

/**
 * @desc javascript编译配置
 * @type {Object}
 */
const DEFAULT_CONFIG_JS = {
  // 源文件扩展名
  ext: 'js',

  // 源码js文件目录，相对于basic.source
  source: 'js',

  // 编译输入目录，相对于basic.output
  output: 'js',

  // js入口文件的前缀，入口文件的命名规则为[mainFilePrefix].*.[ext]
  mainFilePrefix: 'main',

  // 是否开启uglify功能
  uglify: true,

  // 是否使用hash指纹
  useHash: true,

  // 异步模块是否使用hash指纹
  asyncModuleHash: true,

  // 是否将公共模块提取为独立文件
  splitCommonModule: true,

  // 是否开启代码规范检查
  lint: true,
  
  // 定义编译过程替换的变量
  // define: {
  //   API: '/api'
  // },

  // 自行指定入口文件，未指定的文件即使符合命名规范也不会参与编译
  // common赋值为空数组时将提取webpack runtime作为common模块
  // files: {
  //     main: {},
  //     common: []
  // },

  // 独立配置webpack
  webpackConfig: null
};

/**
 * @desc style编译配置
 * @type {Object}
 */
const DEFAULT_CONFIG_STYLE = {
  // 预编译器类型，默认为原生css
  ext: 'css',

  // 源码style文件目录，相对于basic.source
  source: 'style',

  // 编译输入目录，相对于basic.output
  output: 'style',
  
  // 是否使用hash指纹
  useHash: true,

  extract: true,
  
  // 是否自动补全hack前缀
  autoprefix: false,

  // style主文件的前缀，入口文件的命名规则为[mainFilePrefix].*.[ext]
  mainFilePrefix: 'main',

  // sprites配置项
  sprites: {
    // 散列图片目录
    source: 'icons',
    // 是否根据子目录分别编译输出
    split: true,
    // 是否识别retina命名标识
    retina: true
  },

  // 独立配置webpack
  webpackConfig: null
};

/**
 * @desc html编译配置
 * @type {Object}
 */
const DEFAULT_CONFIG_HTML = {
  // 源文件后缀类型，默认为html
  ext: 'html',

  // 模板引擎，默认为html
  engine: 'html',
  
  // 源码view文件目录，相对于basic.source
  source: '/',

  // 编译输入目录，相对于basic.output
  output: '/',

  // view主文件的前缀，命名规则为[mainFilePrefix].*.[ext]
  mainFilePrefix: 'index',

  removePrefixAfterBuilt: true,

  // 静态资源js&css的url是否加上query时间戳
  urlTimestamp: false,

  // 资源定位模式
  staticLocateMode: 'loose',

  // data for ssr
  renderData: null,

  // 配置需要编译的模板文件
  // 如果用户不配置，则boi将匹配模板目录下的所有模板文件
  // files: [],

  // 独立配置webpack
  webpackConfig: null
};

/**
 * @desc image编译配置
 * @type {Object}
 */
const DEFAULT_CONFIG_IMAGE = {
  // 图片后缀类型
  ext: ['png', 'jpg', 'gif', 'jpeg'],
  
  // 编译输入目录，相对于basic.output
  output: 'assets',

  // 是否对小尺寸图片进行base64编码，默认false
  base64: true,

  // 应用base64编码图片的体积临界值，小于此值得图片会被base64编码
  base64Limit: 10000,

  // 是否使用hash指纹
  useHash: true,
  
  // 独立配置webpack
  webpackConfig: null
};

const DEFAULT_CONFIG_SERVE = {
  domain: 'localhost',
  port: '8888',
  devServerConfig: {
    // noInfo: true,
    // quiet: true,
    clientLogLevel: 'error',
    // 不启用压缩
    compress: false,
    // enable hmr
    hot: true,
    hotOnly: true,
    // no lazy mode
    lazy: false,
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: false
    },
    overlay: {
      warnings: false,
      error: true
    },
    watchContentBase: false,
    stats: {
      children: false,
      errors: true,
      colors: true,
      chunks: false,
      chunkModules:false
    }
  }
};

module.exports = {
  patterns: PATTERNS,
  default: {
    'basic': DEFAULT_CONFIG_BASIC,
    'js': DEFAULT_CONFIG_JS,
    'style': DEFAULT_CONFIG_STYLE,
    'html': DEFAULT_CONFIG_HTML,
    'image': DEFAULT_CONFIG_IMAGE,
    'serve': DEFAULT_CONFIG_SERVE,
    'pluginsConfig': [],
    'pluginsPatterns': []
  }
};
