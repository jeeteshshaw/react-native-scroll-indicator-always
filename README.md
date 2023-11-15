Certainly! If you want to simplify the README to focus on the `ScrollView` and `FlatList` components without explicitly mentioning `ScrollIndicatorAlways`, here's a revised version:

---

# React Native Scroll Indicator Always

[![npm version](https://img.shields.io/npm/v/react-native-scroll-indicator-always.svg)](https://www.npmjs.com/package/react-native-scroll-indicator-always)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Enhance your React Native ScrollView and FlatList components with always-visible scroll indicators.

## Installation

```bash
npm install react-native-scroll-indicator-always
```

## Usage

```javascript
import { ScrollView, FlatList, ScrollViewProps, FlatListProps } from 'react-native-scroll-indicator-always';

// Your ScrollView and FlatList implementation here
```

## ScrollViewProps and FlatListProps

### Properties

- **showAlways** *(boolean)*: Set to `true` to always show the scroll indicator.

- **indicatorColor** *(string)*: Customize the color of the scroll indicator.

- **indicatorWidth** *(number)*: Adjust the width of the scroll indicator.

- **indicatorBorder** *(number)*: Set the border of the scroll indicator.

### Example

```javascript
import { ScrollView, FlatList, ScrollViewProps, FlatListProps } from 'react-native-scroll-indicator-always';

const MyScrollViewComponent: React.FC<ScrollViewProps> = (props) => {
  return (
    <ScrollView
      showAlways={true}
      indicatorColor="#3498db"
      indicatorWidth={5}
      indicatorBorder={2}
      {...props}
    >
      {/* Your scrollable content here */}
    </ScrollView>
  );
};

const MyFlatListComponent: React.FC<FlatListProps<MyItem>> = (props) => {
  return (
    <FlatList
      showAlways={true}
      indicatorColor="#3498db"
      indicatorWidth={5}
      indicatorBorder={2}
      {...props}
    />
  );
};
```

## Contributing

If you want to contribute to the project, follow these steps:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to modify the README further based on your specific implementation details or to include any additional information you deem necessary.