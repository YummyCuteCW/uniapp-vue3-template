/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */
import type { PluginOption } from 'vite';
import uniPlugin from '@dcloudio/vite-plugin-uni';
import { AutoImportDeps } from './autoImport';
import { AutoRegistryComponents } from './component';
import { ConfigUnoCSSPlugin } from './unocss';
import { ConfigImageminPlugin } from './imagemin';
// import { ReplaceUrlPlugin } from './replaceUrl';
// import { CleanImagePlugin } from './cleanImage';

export default function createVitePlugins(isBuild: boolean) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // UnoCSS配置
    ConfigUnoCSSPlugin(),
    // 自动按需引入依赖
    AutoImportDeps(),
    // 自动按需引入组件(注意：需注册至 uni 之前，否则不会生效)
    AutoRegistryComponents(),
    // uni支持(兼容性写法，当type为module时，必须要这样写)
    (uniPlugin as any).default(),
  ];

  if (isBuild) {
    const buildPlugins: (PluginOption | PluginOption[])[] = [
      // 图片压缩插件
      ConfigImageminPlugin(),
      // 图片资源自动转换为网络资源
      // ReplaceUrlPlugin(),
      // 自动清除本地图片
      // CleanImagePlugin()
    ];
    vitePlugins.concat(buildPlugins);
  }

  return vitePlugins;
}
