# js 文件转换规则

## 加上可选运算符，提升代码的健壮性

转换前:
```
const { data: { list, item, selectedId } } = this.props

<View key={item.id}>{item.price.amount}</View>
```

转换后:
```
const { list, item, selectedId } = this.props?.data || {}

<View key={item?.id}>{item?.price?.amount}</View>
```