import React, { Component } from 'react'
import isEqual from 'lodash.isequal'
import PropTypes from 'prop-types'
import { View, FlatList, Text, TouchableWithoutFeedback, Image } from 'react-native'
import styles from './SelectMultiple.styles'
import checkbox from '../images/icon-checkbox.png'
import checkboxChecked from '../images/icon-checkbox-checked.png'
import checkboxDisabled from '../images/icon-checkbox-disabled.png'
import { mergeStyles } from './style'

const itemType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({ label: PropTypes.any, value: PropTypes.any, disable: PropTypes.any })
])

const styleType = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.number,
  PropTypes.array
])

const sourceType = PropTypes.oneOfType([PropTypes.object, PropTypes.number])

// A customiseable FlatList that allows you to select multiple rows
export default class SelectMultiple extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(itemType).isRequired,
    selectedItems: PropTypes.arrayOf(itemType),
    maxSelect: PropTypes.number,
    onSelectionsChange: PropTypes.func.isRequired,
    keyExtractor: PropTypes.func,

    checkboxSource: sourceType,
    selectedCheckboxSource: sourceType,
    disabledCheckboxSource: sourceType,
    checkboxIcon: PropTypes.element,
    selectedCheckboxIcon: PropTypes.element,
    disabledCheckboxIcon: PropTypes.element,
    renderLabel: PropTypes.func,
    flatListProps: PropTypes.any,
    style: styleType,
    rowStyle: styleType,
    checkboxStyle: styleType,
    labelStyle: styleType,

    selectedRowStyle: styleType,
    selectedCheckboxStyle: styleType,
    selectedLabelStyle: styleType,

    disabledRowStyle: styleType,
    disabledCheckboxStyle: styleType,
    disabledLabelStyle: styleType
  }

  static defaultProps = {
    selectedItems: [],
    style: {},
    rowStyle: {},
    checkboxStyle: {},
    checkboxCheckedStyle: {},
    labelStyle: {},
    maxSelect: null,
    checkboxSource: checkbox,
    selectedCheckboxSource: checkboxChecked,
    disabledCheckboxSource: checkboxDisabled,
    renderLabel: null
  }

  constructor (props) {
    super(props)
    this.state = { dataSource: [] }
  }

  static getDerivedStateFromProps (props, state) {
    if (
      !isEqual(props.items, state.items) || !isEqual(props.selectedItems, state.selectedItems)
    ) {
      return {
        items: props.items,
        selectedItems: props.selectedItems
      }
    }
    return null
  }

  getRowData ({ items, selectedItems }) {
    items = items.map(this.toLabelValueObject)
    selectedItems = (selectedItems || []).map(this.toLabelValueObject)

    items.forEach((item) => {
      item.selected = selectedItems.some((i) => i.value === item.value)
    })

    return items
  }

  onRowPress (row) {
    const { label, value } = row
    let { selectedItems, maxSelect } = this.props

    selectedItems = (selectedItems || []).map(this.toLabelValueObject)

    const index = selectedItems.findIndex((selectedItem) => selectedItem.value === value)

    if (index > -1) {
      selectedItems = selectedItems.filter((selectedItem) => selectedItem.value !== value)
    } else {
      if (maxSelect != null && selectedItems.length >= maxSelect) {
        return
      } else {
        selectedItems = selectedItems.concat({ label, value })
      }
    }

    this.props.onSelectionsChange(selectedItems, { label, value })
  }

  toLabelValueObject (obj) {
    if (Object.prototype.toString.call(obj) === '[object String]') {
      return { label: obj, value: obj, disable: false }
    } else {
      return { label: obj.label, value: obj.value, disable: obj.disable }
    }
  }

  keyExtractor = (item, index) => index.toString()

  render () {
    const dataSource = this.getRowData(this.state)
    const { style, flatListProps, keyExtractor } = this.props
    return (
      <FlatList
        style={style}
        keyExtractor={keyExtractor || this.keyExtractor}
        data={dataSource}
        renderItem={this.renderItemRow}
        {...flatListProps}
      />
    )
  }

  renderLabel = (label, style, selected) => {
    if (this.props.renderLabel) {
      return this.props.renderLabel(label, style, selected)
    }
    return (
      <Text style={style}>{label}</Text>
    )
  }

  renderItemRow = (row) => {
    let {
      checkboxSource,
      checkboxIcon,
      rowStyle,
      labelStyle,
      checkboxStyle
    } = this.props

    const {
      selectedCheckboxSource,
      selectedCheckboxIcon,
      selectedRowStyle,
      selectedCheckboxStyle,
      selectedLabelStyle,
      disabledCheckboxSource,
      disabledCheckboxIcon,
      disabledRowStyle,
      disabledCheckboxStyle,
      disabledLabelStyle
    } = this.props

    let displayIcon = false // default to image source

    if (row.item.selected) {
      checkboxSource = selectedCheckboxSource
      checkboxIcon = selectedCheckboxIcon
      rowStyle = mergeStyles(styles.row, rowStyle, selectedRowStyle)
      checkboxStyle = mergeStyles(styles.checkbox, checkboxStyle, selectedCheckboxStyle)
      labelStyle = mergeStyles(styles.label, labelStyle, selectedLabelStyle)
    } else if (row.item.disable) {
      checkboxSource = disabledCheckboxSource
      checkboxIcon = disabledCheckboxIcon
      rowStyle = mergeStyles(styles.row, rowStyle, disabledRowStyle)
      checkboxStyle = mergeStyles(styles.checkbox, checkboxStyle, disabledCheckboxStyle)
      labelStyle = mergeStyles(styles.label, labelStyle, disabledLabelStyle)
    } else {
      rowStyle = mergeStyles(styles.row, rowStyle)
      checkboxStyle = mergeStyles(styles.checkbox, checkboxStyle)
      labelStyle = mergeStyles(styles.label, labelStyle)
    }

    if (checkboxIcon) {
    	displayIcon = true
    	checkboxIcon = React.cloneElement(checkboxIcon, { style: checkboxStyle }, null)
	}

    return (
      <TouchableWithoutFeedback onPress={() => this.onRowPress(row.item)} disabled={row.item.disable}>
        <View style={rowStyle}>
          {displayIcon
          	? checkboxIcon
          	: <Image style={checkboxStyle} source={checkboxSource} />
          }
          {this.renderLabel(row.item.label, labelStyle, row.item.selected)}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
