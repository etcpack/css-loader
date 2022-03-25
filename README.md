<p align='center'>
    <a href='https://etcpack.github.io/api' target='_blank'>
        <img src='./logo.png'>
    </a>
</p>

# css-loader
📦 对css中的图片等进行进一步解析的loader，导入的文本应该是css文件

<p>
  <a href="https://hai2007.gitee.io/npm-downloads?interval=7&packages=@etcpack/css-loader"><img src="https://img.shields.io/npm/dm/@etcpack/css-loader.svg" alt="downloads"></a>
  <a href="https://www.npmjs.com/package/@etcpack/css-loader"><img src="https://img.shields.io/npm/v/@etcpack/css-loader.svg" alt="Version"></a>
  <a href="https://github.com/etcpack/css-loader/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/@etcpack/css-loader.svg" alt="License"></a>
  <a href="https://github.com/etcpack/css-loader" target='_blank'><img alt="GitHub repo stars" src="https://img.shields.io/github/stars/etcpack/css-loader?style=social"></a>
</p>

## Issues
使用的时候遇到任何问题或有好的建议，请点击进入[issue](https://github.com/etcpack/css-loader/issues)！

## How to use?

```
npm install --save-dev @etcpack/css-loader
```

然后在```etcpack.config.js```的```loader```配置项中添加，例如：

```js
loader: [{
    test: /\.css$/,
    handler: ['@etcpack/css-loader']
}]
```

开源协议
---------------------------------------
[MIT](https://github.com/etcpack/css-loader/blob/master/LICENSE)

Copyright (c) 2022 [hai2007](https://hai2007.gitee.io/sweethome/) 走一步，再走一步。
