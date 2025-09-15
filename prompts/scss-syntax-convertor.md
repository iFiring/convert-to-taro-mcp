请严格按照转换规则，转换文件列表的scss文件

# 待转换文件

{waitingScssFiles}

# 转换规则

## 需要 @import 语法改为 @use 语法

转换前
```
@import "colors";
```

转换后
```
@use "colors";
```