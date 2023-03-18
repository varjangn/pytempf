# pytempf README

Simple VSCode Extension to Create and Manage temporary python scripts for quick experiments

## Features


- Create files quickly (hint: Cmd+Shift+P and select Python: Create temp file).
- Temp files are cleaned auto when VSCode restarts.
- Open files created during VS Code Session.


### Building extension

- Install dependencies
```
$ cd pytempf
```
```
$ npm run i
```

- Install `vsce` to build extension
```
$ npm install -g @vscode/vsce
```

- Build vsix file
```
$ vsce package
```

- Install extension into your original VS Code Environment
```
$ code --install-extension pytempf-0.0.1.vsix
```


[VS Code API Docs](https://code.visualstudio.com/api/get-started/your-first-extension)