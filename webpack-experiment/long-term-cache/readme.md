# Long Term Cache for Webpack4

## Config https://github.com/jiangjiu/blog-md/issues/49

- set `optimization.moduleIds` to `hashed`(use HashModuleIdPlugin, to make moduleId stable)
- set `optimization.namedChunks` to `true` (use NameChunkPlugin, to make chunkId stable)
- separate runtime chunk(or, just inline it in html), runtime chunk is easily changed. Once new module is added or old module is removed will lead to the change of runtime chunk.
- separate vendor chunk
- set `output.filename` to `[name].[contentHash].bundle.js`(contenthash is important, it prevent hash to change when extract css from chunk, which happens when using `chunkhash`)
- set `output.chunkFilename` to `[name].[contentHash].bundle.js`
- on the server side, add header like `cache-control: max-age 300000000`, to make static asset to be cached on browser very long time


