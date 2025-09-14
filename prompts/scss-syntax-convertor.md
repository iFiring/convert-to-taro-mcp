# scss 文件转换规则

## 需要 @import 语法改为 @use 语法

转换前
```
@import "colors";
```

转换后
```
@use "colors";
```