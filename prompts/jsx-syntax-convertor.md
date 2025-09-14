# jsx 文件转换规则

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

## map 组件带上唯一的 key

转换前:
```
{
    list.map(item => <View>{item.name}</View>)
}
```

转换后:
```
{
    list.map((item, index) => <View key={item.name || index}>{item.name}</View>)
}
```

## 特殊标签结构的语句转换

部份标签的map渲染的index在外层，导致index取值错误，需要将index放进map里。

转换前:
```
{
  index % 2 !== 0 && (
    <Block>
      {objectArray.map((item, index) => {
        return (
          <Block>
            <View>{item.id}</View>
          </Block>
        )
      })}
    </Block>
  )
}
```

转换后:
```
{
    <Block>
        {objectArray.map((item, index) => {
            return <Block>{index % 2 !== 0 && <View>{item.id}</View>}</Block>
        })}
    </Block>
}
```

