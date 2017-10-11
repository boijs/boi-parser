boi.envs(['grey']);

boi.spec('basic', {
  // 项目名称
  appname: 'app',
  // 源码目录
  source: './src/',
  // 编译输出目录
  output: './dest/',
  // 第三方库文件目录
  libs: './libs/',
  // 是否检查并安装依赖模块
  checkDependencies: false
});

// 同名配置覆盖父级
boi.spec('js', {
  // JavaScript文件后缀类型
  ext: 'js',
  // JavaScript文件目录，相对于basic.source
  source: 'js',
  // JavaScript文件输出目录，相对于basic.output
  output: 'js',
  // js入口文件的前缀，入口文件的命名规则为[mainFilePrefix].*.[ext]
  mainFilePrefix: 'main',
  // 是否启用文件hash指纹
  useHash: true,
  // 异步模块是否使用hash指纹
  asyncModuleHash: true,
  // 是否压缩混淆
  uglify: true,
  // 是否开启代码规范测试
  lint: false,
  grey: {
    splitCommonModule: true
  },
  // 否将公共模块提取出来
  splitCommonModule: false,
  // 自行指定入口文件，未指定的文件即使符合命名规范也不会参与编译
  // common赋值为空数组时将提取webpack runtime作为common模块
  // files: {
  //     common: ['vue']
  // },
  testing: {
    // 定义测试环境下编译过程替换的变量
    define: {
      'API_BASE_PATH': '//10.152.31.111:9080/icn/'
    }
  },
  prod: {
    // 定义生产环境下编译过程替换的变量
    define: {
      'API_BASE_PATH': '//service.map.sogou.com/icn/'
    }
  }
});

boi.spec('style', {
  // Style文件后缀类型
  ext: 'scss',
  // Style文件目录，相对于basic.source
  source: 'style',
  // Style文件输出目录，相对于basic.output
  output: 'style',
  useHash: true,
  // 是否自动补全hack前缀
  autoprefix: false,

  mainFilePrefix: 'main',
  // 是否启用CSS Sprites自动生成功能

  sprites: {
    // 散列图片目录
    source: 'icons',
    // 是否根据子目录分别编译输出
    split: true,
    // 是否识别retina命名标识
    retina: true,
    // 自行配置postcss-sprite编译配置
    // @see https://github.com/2createStudio/postcss-sprites
    postcssSpritesOpts: null
  }

});

boi.spec('html', {
  // 源文件后缀类型，默认为html
  ext: 'html',
  // 模板引擎，默认为html
  engine: 'mustache',
  // 如果采用模板引擎，此配置项为true时将模板语法编译为HTML语法，false时保留原语法
  buildToHtml: true,
  // Html文件目录，相对于basic.source
  source: './',
  // Html文件编译输出目录，相对于basic.output
  output: './',
  // 模板入口文件的前缀，入口文件的命名规则为[mainFilePrefix].*.[ext]
  mainFilePrefix: 'index',
  // staticLocateMode: 'strict',
  // 是否编译输出静态资源的map文件
  staticSrcmap: false,
  // 静态资源js&css的url是否加上query时间戳
  urlTimestamp: true,
  // favicon路径
  favicon: null,
  // 指定需要编译的模板文件
  // 如果用户不配置，则boi将匹配模板目录下的所有符合命名规范的模板文件
  // files: [],
  renderData: {
    title: 'test title'
  }
});

boi.spec('image', {
  // 图片后缀类型
  ext: ['png', 'jpg', 'gif', 'jpeg'],
  output: 'assets',
  // 是否对小尺寸图片进行base64编码，默认false
  base64: true,
  // 应用base64编码图片的体积临界值，小于此值得图片会被base64编码
  base64Limit: 100,
  useHash: true
});

// 本地服务器配置
boi.serve({
  port: 8888
});

// 部署功能配置
boi.deploy({
  cdn: {
    domain: '',
    path: './'
  },
  testing: {
    // cdn字段会影响编译输出的静态资源url
    // cdn: {
    //     domain: 'sg.mengine.map.sogou.com',
    //     path: '/map_sogou/m_dev/activateNavi/'
    // },
    connect: {
      type: 'sftp',
      config: {
        host: '10.152.78.42',
        path: '/go2data/website/map_sogou/m_dev/activateNavi',
        auth: {
          username: 'root',
          password: '~jNi6L1'
        }
      }
    }
  },
  prod: {
    // cdn字段会影响编译输出的静态资源url
    cdn: {
      domain: 'map.sogou.com',
      path: '/m/activateNavi/'
    },
    connect: {
      type: 'sftp',
      config: {
        host: '10.152.78.42',
        path: '/go2data/website/map_sogou/m/activateNavi',
        auth: {
          username: 'root',
          password: '~jNi6L1'
        }
      }
    }
  }
});
