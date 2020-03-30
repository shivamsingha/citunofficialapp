import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const realWidth = height > width ? width : height;
const realHeight = height > width ? height : width;

export const relativeWidth = num => (realWidth * num) / 100;
export const relativeHeight = num => (realHeight * num) / 100;
