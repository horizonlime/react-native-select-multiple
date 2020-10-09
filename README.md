# @horizonlime/react-native-select-multiple

[![Build Status](https://travis-ci.org/tableflip/react-native-select-multiple.svg?branch=master)](https://travis-ci.org/tableflip/react-native-select-multiple)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A customizable FlatList that allows you to select multiple rows AND:
- display checkboxes as disabled
- use icons instead of images

This is a modified version of TABLEFLIP's [react-native-select-multiple](https://github.com/tableflip/react-native-select-multiple)

![select-multiple](https://cloud.githubusercontent.com/assets/152863/20929245/3569a3c6-bbc1-11e6-9d80-7f13e4c532c5.gif)

## Install

```sh
npm install @horizonlime/react-native-select-multiple
```

## Usage

```js
import React, { Component } from 'react'
import { View } from 'react-native'
import SelectMultiple from '@horizonlime/react-native-select-multiple'

const fruits = ['Apples', 'Oranges', 'Pears']
// --- OR ---
// const fruits = [
//   { label: 'Apples', value: 'appls', disable: false },
//   { label: 'Oranges', value: 'orngs', disable: true },
//   { label: 'Pears', value: 'pears', disable: false }
// ]

class App extends Component {
  state = { selectedFruits: [] }

  onSelectionsChange = (selectedFruits) => {
    // selectedFruits is array of { label, value }
    this.setState({ selectedFruits })
  }

  render () {
    return (
      <View>
        <SelectMultiple
          items={fruits}
          selectedItems={this.state.selectedFruits}
          onSelectionsChange={this.onSelectionsChange} />
      </View>
    )
  }
}
export default App

```

## Customize label

```js
import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import SelectMultiple from '@horizonlime/react-native-select-multiple'
import { Ionicons } from '@expo/vector-icons'

const fruits = ['Apples', 'Oranges', 'Pears']
// --- OR ---
// const fruits = [
//   { label: 'Apples', value: 'appls', disable: false },
//   { label: 'Oranges', value: 'orngs', disable: true },
//   { label: 'Pears', value: 'pears', disable: false }
// ]

const renderLabel = (label, style) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image style={{width: 42, height: 42}} source={{uri: 'https://dummyimage.com/100x100/52c25a/fff&text=S'}} />
      <View style={{marginLeft: 10}}>
        <Text style={style}>{label}</Text>
      </View>
    </View>
  )
}

class App extends Component {
  state = { selectedFruits: [] }

  onSelectionsChange = (selectedFruits) => {
    // selectedFruits is array of { label, value }
    this.setState({ selectedFruits })
  }

  render () {
    return (
      <View>
        <SelectMultiple
          items={fruits}
          renderLabel={renderLabel}
          selectedItems={this.state.selectedFruits}
          onSelectionsChange={this.onSelectionsChange}
          checkboxIcon={<Ionicons name="ios-radio-button-off" size={30} color={grey} />} />
      </View>
    )
  }
}
```

## Properties

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| items | - | `array` | All items available in the list (array of `string` or `{ label, value }`) |
| selectedItems | `[]` | `array` | The currently selected items (array of `string` or `{ label, value }`) |
| onSelectionsChange | - | `func` | Callback called when a user selects or de-selects an item, passed `(selections, item)` |
| keyExtractor | `index` | `func` | [keyExtractor](https://facebook.github.io/react-native/docs/flatlist.html#keyextractor) for the `FlatList` |
| checkboxSource | [image](images/icon-checkbox.png) | `object` | [Image source](https://facebook.github.io/react-native/docs/image.html#source) for the checkbox (unchecked). |
| selectedCheckboxSource | [image](images/icon-checkbox-checked.png) | `object` | [Image source](https://facebook.github.io/react-native/docs/image.html#source) for the checkbox (checked). |
| disabledCheckboxSource | [image](images/icon-checkbox-disabled.png) | `object` | [Image source](https://facebook.github.io/react-native/docs/image.html#source) for the checkbox (disabled). |
| checkboxIcon | [element] | `object` | Icon component for the checkbox (unchecked). |
| selectedCheckboxIcon | [element] | `object` | Icon component for the checkbox (checked). |
| disabledCheckboxIcon | [element] | `object` | Icon component for the checkbox (disabled). |
| flatListProps | {} | `object` | Additional props for the flat list |
| style | [default styles](src/SelectMultiple.styles.js) | `object` | [Style](https://facebook.github.io/react-native/docs/scrollview.html#style) for the `FlatList` container. |
| rowStyle | [default styles](src/SelectMultiple.styles.js) | `object` | [Style](https://facebook.github.io/react-native/docs/view.html#style) for the row container. |
| checkboxStyle | [default styles](src/SelectMultiple.styles.js) | `object` | [Style](https://facebook.github.io/react-native/docs/image.html#style) for the checkbox image. |
| labelStyle | [default styles](src/SelectMultiple.styles.js) | `object` | [Style](https://facebook.github.io/react-native/docs/text.html#style) for the text label. |
| selectedRowStyle | [default styles](src/SelectMultiple.styles.js) | `object` | [Style](https://facebook.github.io/react-native/docs/view.html#style) for the row container when selected. |
| selectedCheckboxStyle | [default styles](src/SelectMultiple.styles.js) | `object` | [Style](https://facebook.github.io/react-native/docs/image.html#style) for the checkbox image when selected. |
| selectedLabelStyle | [default styles](src/SelectMultiple.styles.js) | `object` | [Style](https://facebook.github.io/react-native/docs/text.html#style) for the text label when selected. |
| disabledRowStyle | [default styles](src/SelectMultiple.styles.js) | `object` | [Style](https://facebook.github.io/react-native/docs/view.html#style) for the row container when disabled. |
| disabledCheckboxStyle | [default styles](src/SelectMultiple.styles.js) | `object` | [Style](https://facebook.github.io/react-native/docs/image.html#style) for the checkbox image when disabled. |
| disabledLabelStyle | [default styles](src/SelectMultiple.styles.js) | `object` | [Style](https://facebook.github.io/react-native/docs/text.html#style) for the text label when disabled. |
| renderLabel | null | `func` | Function for render label. |
| maxSelect | null | `int` | Maximum number of selected items|

## Contribute

Feel free to dive in! [Open an issue](https://github.com/horizonlime/react-native-select-multiple/issues/new) or submit PRs.

## License

[ISC](LICENSE) © Horizon Lime

----

Many thanks to TABLEFLIP's [react-native-select-multiple](https://github.com/tableflip/react-native-select-multiple)
